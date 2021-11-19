import Vue from 'vue'
import Vuex from 'vuex'
import {shiftStates} from "@/common";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selectorIsShowed: false,
        paymentIsShowed: false,
        selectedSku: [],
        exportDocs:[],
        shiftState: {status: -1, text: "неизвестно"}
    },
    mutations: {
        showSkuSelector: (state) => {
            state.selectorIsShowed = true
        },
        hideSkuSelector: (state) => {
            state.selectorIsShowed = false
        },
        setSelectedSku: (state, payload) => {
            state.selectedSku = payload
        },
        setShiftState: (state, payload) => {
            if (shiftStates[payload] !== undefined) {
                state.shiftState = shiftStates[payload]
            } else {
                alert("Получен неверный тип кассовой смены")
            }
        },
        showPayment: (state) => state.paymentIsShowed = true,
        hidePayment: (state) => state.paymentIsShowed = false,
        setExportDocs: (state, payload) => state.exportDocs = payload,

    },
    actions: {},
    modules: {}
})
