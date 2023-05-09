import axios from "axios";
import { useAlertStore } from "../../store/alert";
import { Staff } from "../../types/staff";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export function useStaffDetail() {
    const alertStore = useAlertStore();
    const router = useRouter();
    const pages = [
        { name: "スタッフ一覧", href: "/staffs", current: false },
        { name: "スタッフ詳細", href: "", current: true },
    ];
    const staffId = location.pathname.split("/")[2];

    const staff = ref<Staff>({
        id: 0,
        firstName: "",
        lastName: "",
        firstNameKana: "",
        lastNameKana: "",
        email: "",
    });

    const formType = ref<"view" | "edit">("view");

    const changeMode = (mode: "view" | "edit") => {
        formType.value = mode;
    };

    const fetchStaff = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/staff/${staffId}`
            );
            staff.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    const updateStaff = async (params: Staff) => {
        try {
            await axios.put(
                `http://localhost:8080/api/staff/${staffId}`,
                params
            );
            await fetchStaff();
            formType.value = "view";
            alertStore.showSuccessAlert();
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    const deleteStaff = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/staff/${staffId}`);
            await fetchStaff();
            alertStore.showSuccessAlert();
            router.push("/staffs");
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        fetchStaff();
    });

    return { pages, staff, formType, updateStaff, changeMode, deleteStaff };
}
