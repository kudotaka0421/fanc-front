export function useStaffCreate() {
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
    return { pages, staff };
}
