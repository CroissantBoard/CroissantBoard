export default interface IProject {
    uid?: string,
    name?: string,
    iconColor?: string;
    createdBy?: string;
    participants?: string[],
    tasks?: string[],
    meetings?: string[],
}
