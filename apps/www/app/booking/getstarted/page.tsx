"use client"
import { useForm, SubmitHandler } from 'react-hook-form';

export default function Upload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data:any) => {
    const formData = new FormData();
    

    await fetch('/api/booking', {
        method: 'POST',
        body: formData,
    });    

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" name="textfield" />
      <input type="submit" name="Send"/>
    </form>
  );
}