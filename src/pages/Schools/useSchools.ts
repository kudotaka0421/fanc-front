import axios from "axios";

import { School } from "../../types/school";
import { ref, onMounted } from "vue";
import { useAlertStore } from "../../store/alert";

export function useSchools() {
    const alertStore = useAlertStore();
    const pages = [{ name: "スクールを探す", href: "/schools", current: true }];

    const schools = ref<School[]>([]);

    const fetchSchools = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:8080/api/school"
            );
            schools.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        fetchSchools();
    });

    return { pages, schools };
}
