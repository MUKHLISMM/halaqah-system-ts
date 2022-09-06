export const getRole = (roleId: number| undefined) => {
    switch (roleId) {
        case 1:
            return "Admin"
        case 2:
            return "TeacherAdmin"
        case 3:
            return "Teacher"
        case 4:
            return "Student"
        default:
            break;
    }
}