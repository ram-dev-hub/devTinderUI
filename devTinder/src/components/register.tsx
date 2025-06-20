import React, { useState } from 'react';

    interface User {
      firstName: string;
      lastName?: string;
      aboutUs?: string;
      email: string;
      age?: number;
      gender?: 'Male' | 'Female' | 'Others';
      password: string;
      skills?: string[];
      imageUrl?: string;
    }
    
    const Register = () => {
      const [formData, setFormData] = useState<User>({
        firstName: '',
        lastName: '',
        aboutUs: '',
        email: '',
        age: undefined,
        gender: 'Male',
        password: '',
        skills: [],
        imageUrl: '',
      });
    
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: name === 'skills' ? value.split(',') : value,
        }));
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
      };
    
      return (
        <div className="flex overflow-y-auto justify-center items-start flex-grow p-4 bg-base-200 gap-3"> 
            <form
                onSubmit={handleSubmit}
                className=" card bg-base-100 shadow-xl w-full max-w-md p-6"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

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
                        className="input input-bordered w-full"
                    />
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
                        className="input input-bordered w-full"
                    />
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
                        className="textarea textarea-bordered h-24 w-full"
                    />
                </div>

                <div className="form-control mb-4">
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
                        className="input input-bordered w-full"
                    />
                </div>

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
                        className="input input-bordered w-full"
                    />
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

                <div className="form-control mb-4">
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
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Skills (comma-separated)</span>
                    </label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={formData.skills?.join(',') || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
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
                        className="file-input file-input-bordered w-full"
                    />
                    {formData.imageUrl && (
                        <div className="mt-2">
                            <img 
                                src={formData.imageUrl} 
                                alt="Profile preview" 
                                className="w-32 h-32 object-cover rounded-full"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Register
                </button>
            </form>
        </div>
      );
    };

    export default Register;
  

