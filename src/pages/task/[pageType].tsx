'use client'

import { NextPage } from "next";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import DynamicForm from "@/components/form/DynamidForm";
import FormProvider from "@/components/form/RHFProvider";
import { useForm } from "react-hook-form";
import ButtonUI from "@/components/ui/button";
import { createTaskSchema, CreateTaskSchemaType } from "@/schemas/task.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { createTaskThunk, getTaskDetailThunk, uploadFileThunk } from "@/store/tasks/taskThunk";
import { toast } from "react-toastify";
import Loading from "@/loading";
import { searchUsersThunk } from "@/store/auth/authThunk";
import PageTaskDetail from "@/components/tasks/PageTaskDetail";


const TaskDetailPage: NextPage = () => {

    const param = useParams()
    const pageType = param?.pageType as string

    const [uid, setUid] = useState<string>('')


    const isView = pageType === 'view'
    const isCreate = pageType === 'create'
    const isEdit = pageType === 'edit'

    const query = useSearchParams()

    const readOnly = isView


    const dispatch = useAppDispatch();
    const { loading, detail, } = useAppSelector(state => state.tasks);

    const router = useRouter()

    useEffect(() => {
        const id = query?.get('id')
        if (id) {
            setUid(id)
        }
    }, [query])

    useEffect(() => {
        if ((isView || isEdit) && uid) {
            getDetail(uid)
        }
    }, [uid, isView, isEdit]);


    useEffect(() => {
        if (!detail || isCreate) return;
        methods.reset({
            title: detail.title,
            description: detail.description,
            due_time: detail.dueTime,
            priority: detail.priority,
            details: detail.details.map(item => ({
                detailId: item.id,
                title: item.title,
                isCompleted: item.isCompleted
            })),
            attachments: []
        })
    }, [detail, isCreate])


    const getDetail = async (uid: string) => {
        await dispatch(getTaskDetailThunk(Number(uid)))
    }

    const searchUsers = async (keyword: string) => {
        try {
            return await dispatch(searchUsersThunk(keyword)).unwrap()
        } catch (err) {
            console.error("searchUsers error:", err)
            return []
        }
    }



    const inputProduct = [
        { name: 'title', label: 'Task Title', size: 12, placeholder: 'What needs to be done?' },
        { name: 'description', label: 'Description', size: 12, type: 'textarea', placeholder: 'Add some details about this task...' },
        { name: 'due_time', label: 'Due Date', size: 4, type: 'date' },
        { name: 'priority', label: 'Priority', size: 4, type: 'combobox', options: ['Low', 'Medium', 'High'] },
        // { name: 'assigned_to', label: 'Assigned To', size: 4, type: 'autocomplete-async', fetchOptions: searchUsers },
        { name: 'details', label: 'TODO checklist', size: 12, type: 'checklist', placeholder: 'Add checklist item...' },
        { name: 'attachments', label: 'Add Attachments', size: 12, type: 'uploadfile', placeholder: 'Add checklist item...' },
    ]

    const methods = useForm<CreateTaskSchemaType>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: '',
            description: '',
            due_time: undefined,
            priority: 'Medium',
            // assigned_to: '',
            details: [],
            attachments: [],
        },
        mode: 'onChange',
    });
    const { control } = methods

    const handleSubmit = async (data: any) => {

        const { attachments, ...taskPayloads } = data
        try {

            const result = await dispatch(createTaskThunk(taskPayloads))

            if (!createTaskThunk.fulfilled.match(result)) {
                toast.error('Failed to create task');
                return;
            }

            const taskId = result.payload.task_id

            if (attachments && attachments.length > 0) {

                const formData = new FormData();
                attachments.forEach((file: File) => {
                    formData.append('files', file);
                });
                await dispatch(uploadFileThunk({
                    taskId,
                    formData
                }))
            }
            toast.success('The task was successfully created');
            methods.reset();

        } catch (err) {
            toast.error('Something went wrong');
        }
    }
    return (
        <Box sx={{ minHeight: '100vh', p: 1 }}>
            {
                loading && (
                    <Loading />
                )
            }
            {/*form  */}
            <FormProvider methods={methods} onSubmit={handleSubmit}>
                <Paper elevation={23} sx={{ padding: 3, backgroundColor: 'rgb(25, 39, 52)', color: 'white' }}>

                    {/* title */}
                    <Typography sx={{ textAlign: 'left', mb: 3, fontSize: 20, fontWeight: 600 }}>
                        {/* {isView && ` Detail  ${pageType}`} */}
                        {isCreate && ` ${isCreate && 'Create'} Task `}
                        {isEdit && ` ${isEdit && 'Edit'} Task `}
                    </Typography>

                    {isView && (
                        <PageTaskDetail />
                    )}

                    {isCreate && (
                        <Grid spacing={3} container>
                            <DynamicForm
                                formConfig={inputProduct}
                                control={control}
                                readonly={readOnly}
                            />
                        </Grid>
                    )

                    }

                    {isCreate && (
                        <ButtonUI name="create" type="submit" fullWidth disabled={loading} />
                    )}

                    {isEdit && (
                        <ButtonUI name="update" type="submit" fullWidth disabled={loading} />
                    )}

                    {/* {isView && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, mt: 2 }}>
                            <ButtonUI
                                name="Back"
                                type="button"
                                onClick={() => router.back()}
                                sx={{ bgcolor: 'gray' }}
                            />
                            <ButtonUI
                                name="Edit"
                                type="button"
                                onClick={() => router.push(`/dashboard/tasks/edit?id=${uid}`)}
                            />
                        </Box>
                    )} */}

                </Paper>

            </FormProvider>

        </Box>
    )

}
export default TaskDetailPage