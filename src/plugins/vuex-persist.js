import VuexPersistence from 'vuex-persist'
 
export default ({store}) => {
    return new VuexPersistence({
        /* your options */
        key: 'albumboutique'
    }).plugin(store);
}