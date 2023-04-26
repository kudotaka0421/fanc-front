import { defineStore } from "pinia";

interface AlertState {
    showAlertSuccess: boolean;
    showAlertError: boolean;
}

export const useAlertStore = defineStore("alert", {
    state: (): AlertState => ({
        showAlertSuccess: false,
        showAlertError: false,
    }),
    actions: {
        showSuccessAlert() {
            console.log("showSuccessAlert");
            this.showAlertSuccess = true;

            setTimeout(() => {
                this.showAlertSuccess = false;
            }, 3000);
        },

        showErrorAlert() {
            this.showAlertError = true;
        },
    },
});
