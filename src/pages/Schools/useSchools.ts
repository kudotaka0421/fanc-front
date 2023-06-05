import { School } from "../../types/school";
import { ref, onMounted } from "vue";

export function useSchools() {
    const pages = [{ name: "スクールを探す", href: "/staffs", current: true }];

    const schools = ref<School[]>([]);

    const fetchSchools = async () => {
        try {
            // const { data } = await axios.get("http://localhost:8080/api/staff");
            // schools.value = mockSchoolsData.value;
        } catch (err) {
            // alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        fetchSchools();
    });

    return { pages, schools };
}
