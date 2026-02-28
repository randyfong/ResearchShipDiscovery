'use client';

import React from 'react';
import { Ship, Anchor, Cpu, CheckCircle, ExternalLink } from 'lucide-react';

interface VesselProps {
    name: string;
    home_port: string;
    operating_region: string;
    equipment: string[];
    confidence_score: number;
    operator: string;
    description: string;
}

const VesselCard: React.FC<VesselProps> = ({
    name,
    home_port,
    operating_region,
    equipment,
    confidence_score,
    operator,
    description,
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-100/50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <Ship className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">{name}</h3>
                        <p className="text-sm font-medium text-slate-500">{operator}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100/80 text-emerald-700 rounded-full text-sm font-bold border border-emerald-200 shadow-sm">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {confidence_score}%
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Match Score</p>
                </div>
            </div>

            <div className="space-y-4 flex-grow">
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100/50">
                    <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Anchor className="w-3 h-3" /> Home Port
                        </p>
                        <p className="text-sm font-semibold text-slate-700">{home_port}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> Operating Region
                        </p>
                        <p className="text-sm font-bold text-blue-600">{operating_region}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Cpu className="w-3 h-3" /> Equipment
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {equipment.map((item, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-medium border border-slate-200"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed italic">{description}</p>
            </div>

            <button className="mt-6 w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-bold text-sm tracking-wide hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]">
                Initiate Coordination
            </button>
        </div>
    );
};

export default VesselCard;
