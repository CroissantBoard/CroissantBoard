export interface IProject {
    uid?: string,
    name?: string,
    iconColor?: string;
    participants?: string[],
    tasks?: string[],
    meetings?: string[],
}

export interface IProjectShort {
    uid?: string,
    name?: string,
    iconColor?: string,
}