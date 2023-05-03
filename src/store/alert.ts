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
            this.showAlertError = false;
            this.showAlertSuccess = true;

            setTimeout(() => {
                this.showAlertSuccess = false;
            }, 3000);
        },

        showErrorAlert() {
            this.showAlertSuccess = false;
            this.showAlertError = true;
        },
    },
});
