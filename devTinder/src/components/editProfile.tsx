import React, { useEffect, useState } from 'react'
import type { UserState } from '../store/UserState';
import axios from 'axios';
import Card from './card';

const EditProfile = (User: UserState) => {
    const [error, setError] = useState('')
    const [massage, setMassage] = useState('')
    const [newSkill, setNewSkill] = useState('');

    const [formData, setFormData] = useState<{
            firstName: string;
            lastName: string;
            aboutUs: string;
            email: string;
            age: number | undefined;
            gender: string;
            // password?: string;
            skills: string[];
            imageUrl: string;
        }>({
            firstName: '',
            lastName: '',
            aboutUs: '',
            email: '',
            age: undefined,
            gender: 'Male',
            // password: '',
            skills: [],
            imageUrl: '',
        });
    useEffect(() => {
        setFormData({
            firstName: User.firstName || '',
            lastName: User.lastName || '',
            aboutUs: User.aboutUs || '',
            email: User.email || '',
            age: User.age,
            gender: User.gender || 'Male',
            // password: User.password ,
            skills: User.skills || [],
            imageUrl: User.imageUrl || '',
        });
    }, [User]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'skills' ? value.split(',') : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveProfile();


    };


    const saveProfile = async () => {
        try {
            const response = await axios.patch('http://localhost:7200/profile/update', {
                ...formData,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });            

            if (!response) {
                throw new Error('Failed to update profile');
            }
            setMassage('Profile updated successfully');
            setError('');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data);
                } else if (error.request) {
                    setError('Network error, please try again later');
                } else {
                    setError('An unexpected error occurred');
                }
            } else {
                setError('An unexpected error occurred');
            }
        }
    }
    useEffect(() => {
        if (massage) {
            const timer = setTimeout(() => {
                setMassage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [massage]);

    return (
        <div className="flex flex-row justify-center items-start flex-grow p-4 bg-base-200 gap-4 w-full">
            <div className="flex-1 flex justify-end">
            <form
                onSubmit={handleSubmit}
                className="card bg-base-100 shadow-xl w-full max-w-md p-6"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

                <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">First Name</span>
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full" />
                </div>

                <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Last Name</span>
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input input-bordered w-full" />
                </div>

                <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">About Us</span>
                </label>
                <textarea
                    id="aboutUs"
                    name="aboutUs"
                    value={formData.aboutUs}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-24 w-full" />
                </div>

                {/* <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full" />
                </div> */}

                <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Age</span>
                </label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age || ''}
                    onChange={handleChange}
                    min={16}
                    className="input input-bordered w-full" />
                </div>

                <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Gender</span>
                </label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
                </div>

                {/* <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="input input-bordered w-full" />
                </div> */}

                <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Skills</span>
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                    {formData.skills && formData.skills.length > 0 ? (
                    formData.skills.map((skill, idx) => (
                        <span
                        key={idx}
                        className="badge badge-primary gap-1 items-center"
                        >
                        {skill}
                        <button
                            type="button"
                            className="ml-1 text-xs text-white bg-red-500 rounded-full px-1"
                            onClick={() => {
                            setFormData(prev => ({
                                ...prev,
                                skills: (prev.skills ?? []).filter((_, i) => i !== idx)
                            }));
                            }}
                            aria-label={`Remove ${skill}`}
                        >
                            ×
                        </button>
                        </span>
                    ))
                    ) : (
                    <span className="text-gray-400">No skills added</span>
                    )}
                </div>
                <div className="flex gap-2">
                    <input
                    type="text"
                    id="newSkill"
                    name="newSkill"
                    placeholder="Add a skill"
                    className="input input-bordered w-full"
                    value={newSkill}
                    onChange={e => {
                        const value = e.target.value;
                        setFormData(prev => ({
                        ...prev,
                        newSkill: value
                        }));
                        setNewSkill(value);
                    }}
                    onKeyDown={e => {
                        if (
                        e.key === 'Enter' &&
                        newSkill &&
                        !(formData.skills ?? []).includes(newSkill.trim())
                        ) {
                        e.preventDefault();
                        setFormData(prev => ({
                            ...prev,
                            skills: [...(prev.skills ?? []), newSkill.trim()]
                        }));
                        setNewSkill(''); // Clear the input after adding
                        }
                    }}
                    />
                    <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                        if (
                        newSkill &&
                        !(formData.skills ?? []).includes(newSkill.trim())
                        ) {
                        setFormData(prev => ({
                            ...prev,
                            skills: [...(prev.skills ?? []), newSkill.trim()],
                            newSkill: ''
                        }));
                        setNewSkill('');
                        }
                    }}
                    >
                    Add
                    </button>
                </div>
                </div>

                <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Profile Image</span>
                </label>
                <input
                    type="file"
                    id="imageUrl"
                    name="imageUrl"
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                        setFormData(prev => ({
                            ...prev,
                            imageUrl: e.target?.result as string
                        }));
                        };
                        reader.readAsDataURL(file);
                    }
                    }}
                    className="file-input file-input-bordered w-full" />

                </div>
                <div className="form-control mb-4">
                <p className="text-sm text-gray-500">
                    Note: Please ensure that your profile image is appropriate and adheres to our community guidelines.
                </p>
                <p className="text-error mt-2">{error}</p>
                </div>

                <button
                type="submit"
                className="btn btn-primary w-full"
                >
                Save Profile
                </button>
            </form>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start pl-px-10 pt-px-4">
            <h2 className="text-2xl font-bold mb-4">Profile Preview</h2>

            <Card user={formData} />
            </div>
            {massage && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex justify-center w-full pointer-events-none">
                <div className="alert alert-success pointer-events-auto">
                <span>{massage}</span>
                </div>
            </div>
            )}
        </div>
    )
}

export default EditProfile
