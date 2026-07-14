export interface CertificationItem {
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

export interface CertificationModal {
    active: boolean;
    index: number;
}
