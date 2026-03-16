

import useDebounce from "@/hooks/useDebounce"
import Loading from "@/loading"
import { Autocomplete, Avatar, Box, CircularProgress, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"

type RHFAutoCompleteAsyncProps = {
    name: string
    fetchOptions: (keyword: string) => Promise<any[]>
}



function RHFAutoCompleteAsync({
    name,
    fetchOptions
}: RHFAutoCompleteAsyncProps) {

    const { control } = useFormContext()
    const [inputValue, setInputValue] = useState("")
    const [options, setOptions] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const debounced = useDebounce(inputValue)
    const [selectedOption, setSelectedOption] = useState<any | null>(null)


    useEffect(() => {
        if (!debounced) {
            setOptions([])
            return
        }

        setLoading(true)
        fetchOptions(debounced)
            .then(res => {
                setOptions(res)
            })

            .finally(() => setLoading(false))

    }, [debounced])


    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    options={options}
                    loading={loading}
                    value={selectedOption}
                    onChange={(_, value) => {
                        setSelectedOption(value)
                        field.onChange(value?.id || null)
                    }}
                    onInputChange={(_, value) => {
                        setInputValue(value)
                    }}
                    getOptionLabel={(option) => option.fullName || ""}
                    isOptionEqualToValue={(opt, val) => opt.id === val.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Gõ tên hoặc email"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading && <CircularProgress size={18} />}
                                        {params.InputProps.endAdornment}
                                    </>
                                )
                            }}
                            sx={{ border: '1px solid rgb(69, 83, 104)' }}
                        />
                    )}

                    renderOption={(props, option) => (
                        <Box
                            component="li"
                            {...props}
                            gap={1}
                            display={"flex"}
                        >
                            <Avatar src={option.avatar} />
                            <Box>
                                <Typography fontWeight={500}>
                                    {option.fullName}
                                </Typography>
                                <Typography fontSize={12} color="text.secondary">
                                    {option.email} • {option.role}
                                </Typography>

                            </Box>
                        </Box>
                    )}

                />
            )}

        />
    )
}

export default RHFAutoCompleteAsync