import { NextResponse } from "next/server";

interface DashboardData {
    name: string;
    data: number[];
}

const getDashboarData = async (): Promise<DashboardData> => {

    const data = [10, 20, 30, 40, 50];
    return { name: 'Dashboard Data', data};
}

export const GET = async () => {
    const dashboardData = await getDashboarData();
    return NextResponse.json(dashboardData);
}