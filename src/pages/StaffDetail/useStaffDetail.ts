import axios from "axios";
import { useAlertStore } from "../../store/alert";
import { Staff } from "../../types/staff";
import { ref, onMounted } from "vue";

export function useStaffDetail() {
    const alertStore = useAlertStore();
    const pages = [
        { name: "スタッフ一覧", href: "/staffs", current: false },
        { name: "スタッフ詳細", href: "", current: true },
    ];

    const staff = ref<Staff | null>(null);

    const formType = ref<"view" | "edit">("view");

    const fetchStaff = async () => {
        const staffId = location.pathname.split("/")[2];
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/staff/${staffId}`
            );
            staff.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        fetchStaff();
    });

    return { pages, staff, formType };
}
