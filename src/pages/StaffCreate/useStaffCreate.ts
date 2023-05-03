import axios from "axios";
import { useAlertStore } from "../../store/alert";
import { useRouter } from "vue-router";
import { Staff } from "../../types/staff";

export function useStaffCreate() {
    const alertStore = useAlertStore();
    const router = useRouter();

    const pages = [
        { name: "スタッフ一覧", href: "/staffs", current: false },
        { name: "スタッフ新規作成", href: "staffCreate", current: true },
    ];

    const staff = {
        firstName: "",
        lastName: "",
        firstNameKana: "",
        lastNameKana: "",
        email: "",
    };

    const createStaff = async (params: Staff) => {
        try {
            await axios.post("http://localhost:8080/api/staff", params);
            alertStore.showSuccessAlert();
            router.push("/staffs");
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };
    return { pages, staff, createStaff };
}
