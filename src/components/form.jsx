import React, {memo, useEffect} from 'react';
import {useForm} from "react-hook-form";
import styled from "styled-components";
import Button from "./button";
import {useGetOneQuery, usePostQuery, usePutQuery} from "../hooks/api";
import {URLS} from "../constants/urls";
import {KEYS} from "../constants/keys";
import {get} from "lodash";
import {v4 as uuid} from 'uuid';

const Styled = styled.form`
  input {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
  }

  textarea {
    width: 100%;
    min-height: 150px;
    margin-bottom: 20px;
    padding: 10px;
  }
`;

const Form = ({setShow, id = null, ...rest}) => {
    const {mutate: createRequest, isLoading} = usePostQuery({listKeyId: KEYS.tasks})
    const {mutate: updateRequest} = usePutQuery({listKeyId: KEYS.tasks})
    const {data} = useGetOneQuery({id, key: KEYS.tasks, url: URLS.tasks, enabled: !!(id), showErrorMsg: false})
    const {register, handleSubmit, watch, getValues, setValue, formState: {errors}} = useForm();
    const onSubmit = data => {
        if (id) {
            updateRequest({
                url: `${URLS.tasks}/${id}`,
                attributes: data
            }, {
                onSuccess: () => {
                    setShow(false)
                },
            })
        }
        else{
            createRequest({
                url: URLS.tasks,
                attributes: {...data,id:uuid()}
            }, {
                onSuccess: () => {
                    setShow(false)
                },
            })
        }
    };

    useEffect(() => {
        if (id) {
            setValue('title', get(data, 'data.title'))
            setValue('description', get(data, 'data.description'))
        }

    }, [data])
    return (
        <Styled onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={get(data, 'data.title')} {...register("title", {required: true})} />
            {errors.title && <span>This field is required</span>}
            <textarea defaultValue={get(data, 'data.description')}  {...register("description")} />
            <div className="text-center">
                <Button type={'submit'}>{id ? 'Edit' : 'Save'}</Button>
            </div>
        </Styled>
    );
};

export default memo(Form);