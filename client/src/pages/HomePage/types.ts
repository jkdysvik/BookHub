export type FrontPageLogoProps = {
    page: number;
    logo_num: number;
    toggleLogo: () => void;
};

export type SelectProps = {
    chosenGenre?: string;
    chosenOrder?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    type: 'genre' | 'order';
};