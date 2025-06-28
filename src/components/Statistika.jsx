import React, { PureComponent, useState } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    BarChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid
} from "recharts";

import Header from "./Header";


export default function StranicaStatistika() {
    return (
        <>
            <Header />
            <Statistika />
        </>
    )
}

function Statistika() {
    return (
        <>
            <div className="max-w-[900px] mx-auto p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Statistika</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <StatCard title="Dnevno" count={5} color="bg-blue-500" />
                    <StatCard title="Nedeljno" count={34} color="bg-green-500" />
                    <StatCard title="Mesečno" count={127} color="bg-yellow-500" />
                    <StatCard title="Godišnje" count={1045} color="bg-red-500" />
                </div>
            </div>
            <div className="max-w-[900px] mx-auto">
                <PredmetiGodina />
                <PredmetiNedelja />
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 max-w-[1000px] mx-auto">
                <PredmetiGodina />
                <PredmetiNedelja />
            </div>
            
        </>

    );
}

function StatCard({ title, count, color }) {
    return (
        <div className={`rounded-lg shadow-md p-4 text-white ${color}`}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-3xl font-bold">{count}</p>
        </div>
    );
}
function PredmetiGodina() {
    const data = [
        { mesec: "Januar", broj: 200 },
        { mesec: "Februar", broj: 150 },
        { mesec: "Mart", broj: 268 },
        { mesec: "April", broj: 110 },
        { mesec: "Maj", broj: 221 },
        { mesec: "Jun", broj: 89 },
        { mesec: "Jul", broj: 300 }
    ];

    const [podaci, setPodaci] = useState(data);

    return (
        <div className="bg-white p-6  ">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pregled predmeta po mesecima</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={podaci}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mesec" />
                    <YAxis ticks={[50, 100, 150, 200, 250, 300, 350]} />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="broj"
                        stroke="#4f46e5" // Tailwind indigo-600
                        strokeWidth={3}
                        activeDot={{ r: 6 }}
                        dot={{ r: 4 }}
                        animationDuration={800}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

function PredmetiNedelja(){
    const data = [
        { mesec: "Januar", broj: 200 },
        { mesec: "Februar", broj: 150 },
        { mesec: "Mart", broj: 268 },
        { mesec: "April", broj: 110 },
        { mesec: "Maj", broj: 221 },
        { mesec: "Jun", broj: 89 },
        { mesec: "Jul", broj: 300 }
    ];

    const [podaciNedelja, setPodaciNedelja] = useState(data);

    return (
        <div className="bg-white p-6 ">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Nedeljni broj predmeta</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={podaciNedelja}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mesec" />
                    <YAxis ticks={[50, 100, 150, 200, 250, 300, 350]} />
                    <Tooltip />
                    <Bar dataKey="broj" fill="#4f46e5" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
