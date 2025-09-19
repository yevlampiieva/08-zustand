"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormValues {
  title: string;
  content?: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("This field is required"),
  content: Yup.string().max(500, "Content is too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("This field is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      toast.success("Your note has been created.");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
    onError() {
      toast.error("Sorry, something is wrong. Try again.");
    },
  });

  const handleSubmit = (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
    mutate(values);
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" onClick={onClose} className={css.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={false}>
              Create note
            </button>
          </div>
        </Form>
      </Formik>
      <Toaster position="top-right" />
    </>
  );
}
