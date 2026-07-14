export interface WorkItem {
    title: string;
    location: string;
    services: string;
    year: string;
    src: string;
    color: string;
    url: string;
    categories: string[];
    icon?: React.ReactNode;
}

export interface WorkModal {
    active: boolean;
    index: number;
}
