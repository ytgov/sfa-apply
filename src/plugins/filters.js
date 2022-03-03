import Vue from 'vue'
import moment from 'moment'
import slugify from 'slugify'

/*
 this.$options.filters[filter](...args);

 
import { mapFilters } from './map-filters';

export default {
    methods: {
        ...mapFilters(['linebreak'])
    }
}

*/
moment.fn.fromNowOrNow = function (a) {
  if (Math.abs(moment().diff(this)) < 1000) { // 1000 milliseconds
    return 'just now'
  }
  return this.fromNow(a)
}

Vue.filter('capitalize', val => (val||"").toUpperCase())
Vue.filter('lowercase', val => (val||"").toLowerCase())
Vue.filter('length', val => (val||"").length)


Vue.filter('truncate', function(string, value) {
    return (string||"").substring(0, value) + '…';
})


Vue.filter('duration', function(duration) {

  var minutes = "0" + Math.floor(duration / 60);
  var seconds = "0" + (duration - minutes * 60);
  var dur = minutes.substr(-2) + ":" + seconds.substr(-2);

  //var minutes = "0" + Math.floor(currentTime / 60);
  //var seconds = "0" + (currentTime - minutes * 60);


  return  minutes.substr(-2) + ":" + seconds.substr(-2);
})


Vue.filter('parse_count', function(string, count) {
  return (string||"").replace('{{count}}', count)
})

Vue.filter('reverse_address', function(address) {
  var values = address.split(", ");
  values.splice(values.length-2, 1);
  return values.join(', ')
})




Vue.filter('provider', function(link) {
  let provider = 'unknown'
  if (/facebook/.test(link)) {
    provider = "facebook"
  } else if (/twitter/.test(link)) {
    provider = "twitter"
  } else if (/reverbnation/.test(link)) {
    provider = "reverbnation"
  } else if (/soundcloud/.test(link)) {
    provider = "soundcloud"
  } else if (/soundcloud/.test(link)) {
    provider = "soundcloud"
  } else if (/youtube/.test(link)) {
    provider = "youtube"
  } else if (/vimeo/.test(link)) {
    provider = "vimeo"
  } else if (/spotify/.test(link)) {
    provider = "spotify"
  }
  return provider;
})



Vue.filter('daterange', function(start_date, end_date) {
  if (typeof start_date.seconds != 'undefined' || typeof end_date.seconds != 'undefined') {
    var start_month = moment.unix(start_date.seconds).format("MMM")
    var end_month = moment.unix(end_date.seconds).format("MMM")

    var start_day = moment.unix(start_date.seconds).format("Do")
    var end_day = moment.unix(end_date.seconds).format("Do")  
  } else {
    var start_month = moment(start_date).format("MMM")
    var end_month = moment(end_date).format("MMM")

    var start_day = moment(start_date).format("Do")
    var end_day = moment(end_date).format("Do") 
  }

  if (start_month === end_month) {
    return `${start_month} ${start_day}-${end_day}`
  } else {
    return `${start_month} ${start_day} - ${end_month} ${end_day}`
  }
})



Vue.filter('toCamelCase', function(string) {
    return (string||"").toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
        return match.charAt(match.length-1).toUpperCase();
    });
})

Vue.filter('formatAddress', function (string) {
  return string.replace(/,/, ',<br />')
})

Vue.filter('slug', function (string) {
  // console.log(string)
  return slugify(string, {
    replacement: '-', // replace spaces with replacement
    remove: null, // regex to remove characters
    lower: true // result in lower case
  })
})



Vue.filter('dow', function(value) {
  if (value) {
    return moment(String(value)).format('dddd')
  }
})

Vue.filter('day', function(value) {
  if (value) {
    return moment(String(value)).format('DD')
  }
})

Vue.filter('month', function(value) {
  if (value) {
    return moment(String(value)).format('MMM')
  }
})

Vue.filter('year', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY')
  }
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mmA')
  }
})

Vue.filter('formatNiceDate', function (value) {
  if (value) {
    return moment(String(value)).format('MMMM Do, Y')
  }
})

Vue.filter('formatNiceDateTime', function (value) {
  if (value) {
    return moment(String(value)).format('MMMM Do, Y @ hh:mm')
  }
})

Vue.filter('formatFromNow', value => {
  return (value) ? moment(String(value)).fromNowOrNow() : 'Unknown'
})

Vue.filter('formatTimestamp', function (timestamp) {

  //console.log(timestamp, moment(timestamp.seconds*1000), moment(timestamp.seconds*1000).toISOString())
  if (timestamp) 
    return moment(timestamp).toISOString()
})
