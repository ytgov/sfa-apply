import VuexPersistence from 'vuex-persist'
 
export default ({store}) => {
    return new VuexPersistence({
        /* your options */
        key: 'yukon-student-financial-portal'
    }).plugin(store);
}