import axios from "axios";
import { useAlertStore } from "../../store/alert";
import { useRouter } from "vue-router";

type Staff = {
    id: number;
    firstName: string;
    lastName: string;
    firstNameKana: string;
    lastNameKana: string;
    email: string;
};

export function useStaffCreate() {
    const alertStore = useAlertStore();
    const router = useRouter();

    const pages = [
        { name: "スタッフ一覧", href: "staffs", current: false },
        { name: "スタッフ新規作成", href: "staffCreate", current: true },
    ];

    const staff = {
        firstName: "",
        lastName: "",
        firstNameKana: "",
        lastNameKana: "",
        email: "",
    };

    // emitでstaffの値を送ってもらう
    const createStaff = async (params: Staff) => {
        try {
            await axios.post("http://localhost:8080/api/staff", params);
            //成功のアラートを表示させる
            alertStore.showSuccessAlert();
            //staff一覧にリダイレクト
            router.push("/staffs");
        } catch (err) {
            // エラーのアラートを表ss示させる
            alertStore.showErrorAlert();
        }
    };
    return { pages, staff, createStaff };
}
