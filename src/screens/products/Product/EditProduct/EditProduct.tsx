'use client'
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Select, SelectItem, Tooltip,
    useDisclosure
} from "@nextui-org/react";
import {Delete, DeleteIcon, Edit, Plus} from "@nextui-org/shared-icons";
import {IProduct} from "@/interfaces/product.interface";
import {useEditProductMutation} from "@/store/product/product.slice";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Input} from "@nextui-org/input";

export function EditProduct ({product}: {product: IProduct}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [editProduct, {
        isLoading,
    }] = useEditProductMutation()

    const {
        control,
        handleSubmit,
        formState: { errors}
    } = useForm<IProduct>({
        mode: "onSubmit",
        defaultValues: product
    });

    const {
        remove,
        append,
        fields,
    } = useFieldArray({
        name: "features",
        control,
    });

    const onSubmit = (data: IProduct) => {
        console.log(data)
        editProduct(data)
    };

    return (
        <>
            <Button
                onPress={onOpen}
                startContent={<Edit className={'fill-primary'}/>}
                variant="bordered"
                color="primary">
                Редактировать
            </Button>

            <Modal
                size={'5xl'}
                scrollBehavior={'outside'}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Редактировать</ModalHeader>
                            <ModalBody>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Controller
                                        name={`name`}
                                        control={control}
                                        rules={{
                                            required: true
                                        }}
                                        render={({field, fieldState: {error}}) => (
                                            <Input
                                                size={'sm'}
                                                label="Название продукта"
                                                variant="bordered"
                                                value={field.value}
                                                isInvalid={!!error}
                                                errorMessage={'Введите название продукта'}
                                                onValueChange={value => {
                                                    field.onChange(value)
                                                }}/>
                                        )}
                                    />

                                    <h3 className={'text-xl font-medium mt-5'}>Цена</h3>
                                    <div
                                        className={'grid grid-cols-2 gap-3 mt-2'}>
                                        <Controller
                                            name={`price.amount`}
                                            control={control}
                                            rules={{
                                                required: true
                                            }}
                                            render={({field, fieldState: {error}}) => (
                                                <Input
                                                    size={'sm'}
                                                    label="Цена продукта"
                                                    variant="bordered"
                                                    value={field.value.toString()}
                                                    isInvalid={!!error}
                                                    errorMessage={'Введите цену продукта'}
                                                    onValueChange={value => {
                                                        field.onChange(+value)
                                                    }}/>
                                            )}
                                        />

                                        <Controller
                                            name={`price.discount.percent`}
                                            control={control}
                                            rules={{
                                                required: true
                                            }}
                                            render={({field, fieldState: {error}}) => (
                                                <Input
                                                    size={'sm'}
                                                    label="Скидка в %"
                                                    variant="bordered"
                                                    type={'number'}
                                                    value={field.value.toString()}
                                                    isInvalid={!!error}
                                                    errorMessage={'Введите скидку продукта'}
                                                    onValueChange={value => {
                                                        field.onChange(+value)
                                                    }}/>
                                            )}
                                        />
                                    </div>


                                    <div className={'mt-5 flex gap-3'}>
                                        <h3 className={'text-xl font-medium'}>Характеристики</h3>
                                        <Tooltip
                                            classNames={{
                                                base: [
                                                    "before:bg-neutral-400 dark:before:bg-white",
                                                ],
                                                content: [
                                                    "py-1 px-2 shadow-xl",
                                                    "text-black bg-gradient-to-br from-white to-neutral-400",
                                                ],
                                            }}
                                            placement={'right'}
                                            content="Добавить">
                                            <Button
                                                size={'sm'}
                                                variant={'bordered'}
                                                color={'primary'}
                                                type="button"
                                                onClick={() => append({name: "", description: ""})}
                                            ><span className={'text-2xl'}>+</span></Button>
                                        </Tooltip>
                                    </div>
                                    {fields
                                        .map((field, index) => {
                                                return (
                                                    <div
                                                        className={'grid grid-cols-[1fr_4fr_auto] gap-3 mt-2'}
                                                        key={field.id}>
                                                        <Controller
                                                            name={`features.${index}.name`}
                                                            control={control}
                                                            rules={{
                                                                required: true
                                                            }}
                                                            render={({field, fieldState: {error}}) => (
                                                                <Input
                                                                    size={'sm'}
                                                                    label="Название"
                                                                    variant="bordered"
                                                                    value={field.value}
                                                                    isInvalid={!!error}
                                                                    errorMessage={'Введите название'}
                                                                    onValueChange={value => {
                                                                        field.onChange(value)
                                                                    }}/>
                                                            )}
                                                        />

                                                        <Controller
                                                            name={`features.${index}.description`}
                                                            control={control}
                                                            rules={{
                                                                required: true
                                                            }}
                                                            render={({field, fieldState: {error}}) => (
                                                                <Input
                                                                    size={'sm'}
                                                                    label="Описание"
                                                                    variant="bordered"
                                                                    value={field.value}
                                                                    isInvalid={!!error}
                                                                    errorMessage={'Введите описание'}
                                                                    onValueChange={value => {
                                                                        field.onChange(value)
                                                                    }}/>
                                                            )}
                                                        />
                                                        <Tooltip
                                                            classNames={{
                                                                base: [
                                                                    "before:bg-neutral-400 dark:before:bg-white",
                                                                ],
                                                                content: [
                                                                    "py-1 px-2 shadow-xl",
                                                                    "text-black bg-gradient-to-br from-white to-neutral-400",
                                                                ],
                                                            }}
                                                            placement={'top'}
                                                            content="Удалить">
                                                            <Button
                                                                size={'sm'}
                                                                color={'danger'}
                                                                variant="bordered"
                                                                type="button"
                                                                className={'h-12'}
                                                                onClick={() => remove(index)}>
                                                                <DeleteIcon className={'text-xl'}/>
                                                            </Button>
                                                        </Tooltip>

                                                    </div>
                                                );
                                            })}

                                    <div className={'flex justify-end mt-8'}>
                                        <Button
                                            type={'submit'}
                                            isLoading={isLoading}
                                            color="primary">
                                            Сохранить
                                        </Button>
                                    </div>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}