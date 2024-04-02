"use client";

import { useEffect, useState } from "react";
import BarChart from "./barChart";

interface DashboardData {
    name: string;
    data: number[];
}

// function BarChart() {
//     return <h1>Bar chart </h1>
// }

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            const response = await fetch('/api/dashboard');
            const data = await response.json();
            setDashboardData(data);
        }

        fetchDashboardData();
    }, []);
    
    console.log("Dashboard client component");
    
    return (
        <div>
        <h1>Dashboard </h1>
        {dashboardData ? (
            <>
                <p>Data Name:{dashboardData.name}</p>
                <BarChart data={dashboardData.data} />
            </>
        ) : (
            <p>Loading...</p>
        )}
        <input value={name} onChange={(e) => setName(e.target.value)}/>
        <p>hello, {name}!</p>
        </div>
    )
}