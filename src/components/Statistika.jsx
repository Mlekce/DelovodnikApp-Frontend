import React, { PureComponent, useEffect, useState } from 'react';
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
    let korisnik = JSON.parse(localStorage.getItem("korisnik"));
    let [stats, setStats] = useState({ poruka: "", dan: "", nedelja: "", mesec: "", godina: "", sedamDana: "" });

    useEffect(() => {
        povuciPodatke()
    }, []);

    async function povuciPodatke() {
        let url = `http://localhost:4000/api/predmet/stats?id=${korisnik.id}`;
        let options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            }
        }
        try {
            let response = await fetch(url, options);
            let data = await response.json()
            console.log(data)
            setStats(data)
        } catch (error) {
            console.log(error)
        }
    }
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
                    <StatCard title="Dnevno" count={stats.dan} color="bg-blue-500" />
                    <StatCard title="Nedeljno" count={stats.nedelja} color="bg-green-500" />
                    <StatCard title="Mesečno" count={stats.mesec} color="bg-yellow-500" />
                    <StatCard title="Godišnje" count={stats.godina} color="bg-red-500" />
                </div>
                <div className=" col-span-12 sm:col-span-9">
                    <PredmetiNedelja dani={stats.sedamDana} />
                    <PredmetiGodina meseci={stats.sestMeseci}/>
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
function PredmetiGodina({ meseci }) {
    const [podaci, setPodaci] = useState([]);
    const [najuspesnijiMesec, setNajuspesnijiMesec] = useState(["", null]);

    useEffect(() => {
        if (Array.isArray(meseci)) {
            setPodaci(meseci);
            setNajuspesnijiMesec(pronadjiMaxVrednostiMesec(meseci));
        }
    }, [meseci]);

    function pronadjiMaxVrednostiMesec(arr) {
        const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
        let maxBroj = 0, maxMesec = 0;
        arr.forEach((obj) => {
            if (obj.broj > maxBroj) {
                maxBroj = obj.broj
                maxMesec = obj.mesec
            }
        });
        return [months[maxMesec], maxBroj]
    }

    return (
        <div className="bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pregled predmeta po mesecima</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={podaci}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mesec" interval={0}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(num) => {
                           const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
                            return months[num];
                        }}/>
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
                Najviše ste uradili predmeta u <span className="font-semibold text-indigo-600">{najuspesnijiMesec[0]}</span> — ukupno <span className="font-semibold">{najuspesnijiMesec[1]}</span>.
            </p>
        </div>
    );
}

function PredmetiNedelja({ dani }) {
    const [podaci, setPodaci] = useState([]);
    const [najuspesnijiDan, setNajuspesnijiDan] = useState(["", null]);


    useEffect(() => {
        if (Array.isArray(dani)) {
            setPodaci(dani);
            setNajuspesnijiDan(pronadjiMaxVrednosti(dani))
        }
    }, [dani]);

    function pronadjiMaxVrednosti(arr) {
        const days = ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"];
        let maxBroj = 0, maxDan = "";
        arr.forEach(day => {
            if (day.broj > maxBroj) {
                maxBroj = day.broj
                maxDan = day.dan
            }
        });
        return [days[new Date(maxDan).getDay()], maxBroj]
    }

    return (
        <div className="bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Nedeljni broj predmeta</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={podaci}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="dan"
                        interval={0}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(str) => {
                            const days = ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"];
                            return days[new Date(str).getDay()];
                        }}
                    />
                    <YAxis ticks={[0, 5, 10, 15, 20, 25]} />
                    <Tooltip />
                    <Bar dataKey="broj" fill="#4f46e5" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
            <p className="mt-0 text-sm text-gray-600 text-center">
                Najviše ste uradili predmeta u <span className="font-semibold text-indigo-600">{najuspesnijiDan[0]}</span> — ukupno <span className="font-semibold">{najuspesnijiDan[1]}</span>.
            </p>
        </div>
    );
}