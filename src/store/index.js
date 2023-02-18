import {createStore} from 'vuex'

import Hall from "@/store/hall";
import Account from "@/store/account";
import Operation from "@/store/operation";


const store = createStore({
    modules: {Hall, Account, Operation},
})

export default store

