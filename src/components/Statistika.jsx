import React, { PureComponent, useState } from 'react';
import { FileDown, FileSpreadsheet } from "lucide-react";
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
            <div className="max-w-[1000px] mx-auto p-6 space-y-0 grid grid-cols-1 sm:grid-cols-12 gap-6 shadow-sm rounded-4xl">
                <h2 className="text-2xl col-span-12 font-semibold text-gray-800 border-b pb-2">Statistika</h2>
                <div className="col-span-12 flex justify-end gap-2">
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm transition">
                        <FileDown size={16} /> Exportuj PDF
                    </button>
                    <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition">
                        <FileSpreadsheet size={16} /> Exportuj Excel
                    </button>
                </div>
                <div className="col-span-12 sm:col-span-3 flex flex-col gap-6">
                    <h2 className='text-xl font-semibold text-gray-700 mt-6'>Prosek</h2>
                    <StatCard title="Dnevno" count={5} color="bg-blue-500" />
                    <StatCard title="Nedeljno" count={34} color="bg-green-500" />
                    <StatCard title="Mesečno" count={127} color="bg-yellow-500" />
                    <StatCard title="Godišnje" count={1045} color="bg-red-500" />
                </div>
                <div className=" col-span-12 sm:col-span-9">
                    <PredmetiNedelja />
                    <PredmetiGodina />
                </div>
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
        <div className="bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pregled predmeta po mesecima</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={podaci}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mesec" />
                    <YAxis ticks={[0, 100, 200, 300, 400]} />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="broj"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        activeDot={{ r: 6 }}
                        dot={{ r: 4 }}
                        animationDuration={800}
                    />
                </LineChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm text-gray-600 text-center">
                Najviše ste uradili predmeta u <span className="font-semibold text-indigo-600">Mart</span> — ukupno <span className="font-semibold">268</span>.
            </p>
        </div>
    );
}

function PredmetiNedelja() {
    const data = [
        { dan: "Ponedeljak", broj: 7 },
        { dan: "Utorak", broj: 15 },
        { dan: "Sreda", broj: 2 },
        { dan: "Cetvrtak", broj: 11 },
        { dan: "Petak", broj: 9 },
        { dan: "Subota", broj: 0 },
        { dan: "Nedelja", broj: 0 }
    ];

    const [podaciNedelja, setPodaciNedelja] = useState(data);

    return (
        <div className="bg-white p-6 ">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Nedeljni broj predmeta</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={podaciNedelja}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dan" />
                    <YAxis ticks={[0, 5, 10, 15, 20, 25]} />
                    <Tooltip />
                    <Bar dataKey="broj" fill="#4f46e5" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
            <p className="mt-0 text-sm text-gray-600 text-center">
                Najviše ste uradili predmeta u <span className="font-semibold text-indigo-600">Utorak</span> — ukupno <span className="font-semibold">15</span>.
            </p>
        </div>
    );
}
