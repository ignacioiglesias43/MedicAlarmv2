import { useForm } from "./useForm"
import { Medicine } from "../api/medicines/model/Medicines"
import { DefaultPicker } from "../components/atoms/CustomDropdown"

export const useUpdateMedicine = (actionType: 'UPDATE' | 'ADD') => {

    const pickerOptions: Array<DefaultPicker> = [
        {name: 'Oral', id: 'Oral'},
        {name: 'Inyectable', id: 'Inyectable'},
        {name: 'Sublingual', id: 'Sublingual'},
        {name: 'Nasal', id: 'Nasal'},
        {name: 'Cutáneo', id: 'Cutáneo'},
        {name: 'Ocular', id: 'Ocular'},
        {name: 'Rectal', id: 'Rectal'},
    ]

    const {createChangeHandler, formFields} = useForm<Medicine, Medicine>({
        id: actionType === 'UPDATE' ? 0 : 0,
        name: actionType === 'UPDATE' ? 'Keterolaco' : '',
        via_admin: 'Oral',
    })

    return {
        formFields,
        setValues: createChangeHandler,
        pickerOptions
    }
}

