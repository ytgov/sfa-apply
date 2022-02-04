import Vue from 'vue'
import $ from 'jquery'
import { firebase, auth } from '@/services/firebase.js'


var Progress = {
  items: {
  },
  total: function() {
    var self = this;
    var totals = 0;
    var count = 0;
    Object.keys(self.items).forEach(function(key){
      totals+=self.items[key]
      count++;
    })
    return (totals * 100) / (count * 100);
  }
}

var FirebaseUploader = {
  upload: function(options, callback, progress_callback) {
    $('<input type="file" multiple />').trigger("click").on("change", function(event){
      //console.log("Uploading", options)

      if (options.multiple) {
        $(this).attr("multiple", true)
      }

      var uploaded_files = [];
      var files = event.target.files // FileList object
      
      Object.keys(files).forEach(function(key){
        var file = files[key];
        var reader = new FileReader()
         // Closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            //console.log(e.target.result)
            var blob = new Blob([e.target.result], { type: "image/jpeg" }); 
            var name = (options.absolute) ? `${options.resource}` : `${options.resource}`;
            var storageRef = firebase.storage().ref(name);


            
            storageRef.getDownloadURL().then(async (downloadURL) => {
              let deleteRef = firebase.storage().refFromURL(downloadURL);
              deleteRef.delete().then(() => {
                var uploadTask = storageRef.put(blob);

                uploadTask.on('state_changed', function(snapshot){
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  //console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                      //console.log('Upload is paused');
                      break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                      //console.log('Upload is running');
                      break;
                  }
                  if (typeof progress_callback == 'function') {
                    Progress.items[`${options.resource}`] = progress;
                    progress_callback(Progress.total(), snapshot.state)
                  }

                  }, function(error) {
                    // Handle unsuccessful uploads
                  }, function() {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                      if (options.multiple) {
                        uploaded_files.push({
                          name: theFile.name,
                          path: downloadURL,
                          ref: `${options.resource}`
                        })
                      } else {
                        callback(downloadURL)
                      }
                    });
                  })
                })
                .catch((error) => {
                  console.error(error);
                });
     
              if (options.multiple) {
                uploaded_files.push({
                  name: theFile.name,
                  path: downloadURL,
                  ref: `${options.resource}`
                })
              } else {
                //callback(downloadURL)
              }

            }, async (error) => {
              var uploadTask = storageRef.put(blob);

              uploadTask.on('state_changed', function(snapshot){
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    //console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    //console.log('Upload is running');
                    break;
                }
                if (typeof progress_callback == 'function') {
                  Progress.items[`${options.resource}`] = progress;
                  progress_callback(Progress.total(), snapshot.state)
                }
              }, function(error) {
                // Handle unsuccessful uploads
              }, function() {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  if (options.multiple) {
                    uploaded_files.push({
                      name: theFile.name,
                      path: downloadURL,
                      ref: `${options.resource}`
                    })
                  } else {
                    callback(downloadURL)
                  }
                });
              });
            });
          };
        })(file)
        reader.readAsArrayBuffer(file)
        reader.onerror = function (e) {
          console.log("Failed file read: " + e.toString());
        };
      });

      if (options.multiple) {
        // console.log("!!!!!", uploaded_files)
        callback(uploaded_files)
      }

      if (options.types && options.types != "*") {
        $(this).attr("accept", options.types.join(","))
      }
    })
  }
}

if (process.BROWSER_BUILD) {
  Vue.use(FirebaseUploader, { dynamic: true })
} 

export default FirebaseUploader