import axios from "axios";
import { useAlertStore } from "../../store/alert";
import { Staff } from "../../types/staff";
import { ref, onMounted } from "vue";

export function useStaffs() {
    const alertStore = useAlertStore();
    const pages = [{ name: "スタッフ一覧", href: "staffs", current: true }];

    const staffs = ref<Staff[]>([]);

    const fetchStaffs = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/staff");
            staffs.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        fetchStaffs();
    });

    return { pages, staffs };
}
