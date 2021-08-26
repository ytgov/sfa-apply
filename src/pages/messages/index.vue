<template>
  <v-container fluid>
    <div class="container my-auto px-7">
      <div class="layout">
        <div class="flex grow">
           <h2 class="font-weight-light primary--text">Inbox</h2>
        </div>
        <div class="flex shrink py-1 no-wrap">
          <button type="button" class="v-btn v-btn--contained v-size--default primary">
            <span class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate mdi mdi-refresh"></i></span>
          </button> 
          <button type="button" class="v-btn v-btn--contained v-size--default primary">
            <span class="v-btn__content">Compose <i aria-hidden="true" class="v-icon notranslate mdi mdi-email-edit-outline"></i></span>
          </button>
        </div>
       </div>
       <div class="layout wrap">
          <div class="flex py-1 elevation-2 grow">
             <div class="v-tabs fill-width v-tabs--grow">
                <div role="tablist" class="v-item-group v-slide-group v-tabs-bar v-tabs-bar--is-mobile v-tabs-bar--show-arrows primary--text" data-booted="true" style="height: 60px;">
                   <div class="v-slide-group__wrapper">
                      <div class="v-slide-group__content v-tabs-bar__content">
                         <div class="v-tabs-slider-wrapper" style="height: 2px; left: 0px; width: 209px;">
                            <div class="v-tabs-slider primary"></div>
                         </div>
                         <div tabindex="0" aria-selected="true" role="tab" class="v-tab v-tab--active">
                            <div class="caption py-1">
                               Messages
                               <span class="v-badge v-badge--overlap"> <i aria-hidden="true" class="v-icon notranslate mdi mdi-email"></i><span class="v-badge__badge primary"><span class="caption">9</span></span></span>
                            </div>
                         </div>
                         <div tabindex="0" aria-selected="false" role="tab" class="v-tab">
                            <div class="caption py-1">
                               Deleted
                               <span class="v-badge v-badge--overlap">
                                  <i aria-hidden="true" class="v-icon notranslate mdi mdi-trash-can"></i><!---->
                               </span>
                            </div>
                         </div>
                         <div tabindex="0" aria-selected="false" role="tab" class="v-tab">
                            <div class="caption py-1">
                               Sent
                               <span class="v-badge v-badge--overlap">
                                  <i aria-hidden="true" class="v-icon notranslate mdi mdi-email-send"></i><!---->
                               </span>
                            </div>
                         </div>
                         <div tabindex="0" aria-selected="false" role="tab" class="v-tab">
                            <div class="caption py-1">
                               Drafts
                               <span class="v-badge v-badge--overlap">
                                  <i aria-hidden="true" class="v-icon notranslate mdi mdi-email-edit-outline"></i><!---->
                               </span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             <div class="v-window mh-580 pa-4 v-item-group v-tabs-items" grow="">
                <div class="v-window__container">
                   <div class="v-window-item v-window-item--active">
                      <div align-center="" class="row mb-5 pb-2 elevation-1">
                         <div class="py-0 col-sm-6 col-6" style="cursor: pointer;">
                            <h4 class="font-italic">Gary Lewis <i aria-hidden="true" title="Read" class="v-icon notranslate mdi mdi-check" style="font-size: 16px; display: none;"></i></h4>
                         </div>
                         <div class="text-right caption py-0 col-sm-6 col-6">
                            Today, 9:18AM
                            <button type="button" class="v-btn v-btn--fab v-btn--flat v-btn--icon v-btn--round v-size--x-small" title="Mark for deletion"><span class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate mdi mdi-trash-can"></i></span></button>
                         </div>
                         <div class="py-0 col col-12">
                            <div>I saw this posting on the board</div>
                         </div>
                      </div>
                    </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  </v-container>
</template>

<i18n>
{
  "en": {

  },
  "fr": {

  }
}
</i18n>

<script>
export default {
  head (){
    return {
      title: 'Yukon Student Financial Portal - Messages',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ],
    }
  },
  mounted() {
   
  }
}
</script>