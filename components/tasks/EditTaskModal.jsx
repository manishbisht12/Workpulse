"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function EditTaskModal({
    isOpen,
    onClose,
    task,
    onUpdateTask,
}) {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || "",
                category: task.category || "",
                priority: task.priority || "Medium",
                status: task.status || "Pending",
                dueDate: task.dueDate
                    ? task.dueDate.split("T")[0]
                    : "",
            });
        }
    }, [task]);

    if (!isOpen || !task) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim() ) {
            return;
        }

        onUpdateTask(task._id, formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0d131a] border border-cyan-900/40 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">

                <div className="flex items-center justify-between p-5 border-b border-cyan-900/30">
                    <h2 className="text-lg font-bold text-slate-100">
                        Edit Task
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                            Task Title
                        </label>

                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            className="w-full bg-[#111923] border border-cyan-900/30 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                                Category
                            </label>

                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }
                                className="w-full bg-[#111923] border border-cyan-900/30 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                                Due Date
                            </label>

                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        dueDate: e.target.value,
                                    })
                                }
                                className="w-full bg-[#111923] border border-cyan-900/30 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-3">

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                                Priority
                            </label>

                            <select
                                value={formData.priority}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        priority: e.target.value,
                                    })
                                }
                                className="w-full bg-[#111923] border border-cyan-900/30 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                                Status
                            </label>

                            <select
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        status: e.target.value,
                                    })
                                }
                                className="w-full bg-[#111923] border border-cyan-900/30 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-cyan-900/30">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                        >
                            Update Task
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}