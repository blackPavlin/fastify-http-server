export type Period = {
    _id: string;
    title: string;
    dateStart: string;
    dateEnd: string;
};

export type PeriodState = {
    periods: Period[];
};

const state: PeriodState = {
    periods: [],
};

export default state;
