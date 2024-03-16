import { Link } from '@/src/components/atoms/Link';
import Input from './Input'
import styled from '@emotion/styled';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getServerSideProps } from './props';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useToggle } from 'usehooks-ts'
import siteMetadata from '@/data/siteMetadata'
import { UserButton } from '@clerk/nextjs'
import siteInfo from '@/data/siteInfo'
import DescComponent from './DescComponent';
import Spinner from './Spinner';
import { Invite } from '@/src/components/invites/Invite';

type login = {
    email: string
    password: string
    confirmPassword?: 'password'
}

type LoginUser = Omit<login, 'login'>
const LOGIN_SCHEMA = yup.object({
    email: yup.string().required('Please enter a valid email').email(),
    password: yup.string().required('Please enter your password.'),
})


export const SignInPage: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = props => {
    const router = useRouter()
    const {
        register,
        handleSubmit,

        formState: { errors, isSubmitting, isSubmitSuccessful, isValid, isDirty },
    } = useForm<LoginUser>({
        resolver: yupResolver(LOGIN_SCHEMA),
    })

    const [loading, toggleLoading] = useToggle()
    const [emails, setEmails] = useState<string[]>([]);
    const [changed, setChanged] = useState("");

    useEffect(() => {
        if (router.query.email) {
            setChanged(router.query.email as string);
            setEmails([router.query.email as string]);
        }
    }, [router.query])

    const onSubmit: SubmitHandler<LoginUser> = async (values) => {
        console.log('form value is value', values)
        // loginCheck(values.email, values.password)
        const raw = JSON.stringify({
            "username": values.email,
            "password": values.password
        });

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: raw,
        };

        const response = await fetch("https://ngo.gutricious.store/login", requestOptions)
        const json = await response.json();
        console.log(json);
        setEmails(json);
        setChanged(values.email);
    }

    useEffect(() => { })

    // const onSubmit = ({ data }) => {
    //   console.log('Data is >>', data)
    // }
    return (
        <>
            {changed.length > 0 ?
                <Invite capacity={emails.length} initEmails={emails} removed={true} owner={changed} />
                :
                <section className="mx-auto px-4 sm:px-6 xl:px-0 text-6xl" style={{ width: "1024px", height: "790px" }}>
                    <div className="mt-30 container h-full pt-20">
                        <section className="pt-10">
                            <Spinner />
                            <div className="mt-30 container h-full pt-20">
                                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                                    <div className="w-full">
                                        <div className="block rounded-lg bg-darkGreen shadow-lg dark:bg-blackDark">
                                            <div className="g-0 lg:flex lg:flex-wrap">
                                                {/* <!-- Left column container--> */}
                                                <div className="px-4 md:px-0 lg:w-6/12">
                                                    <div className="md:mx-6 md:p-12">
                                                        {/* <!--Logo--> */}
                                                        <div className="mb-10 flex w-full flex-wrap items-center justify-center">
                                                            <div>
                                                                <Link href="/" aria-label={siteMetadata.headerTitle}>
                                                                    <div className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl">
                                                                        {typeof siteMetadata.headerTitle === 'string' ? (
                                                                            <div className="hidden h-6 w-full text-xl font-bold leading-tight tracking-tight text-titleColorLM dark:text-neutral-100 sm:block md:text-3xl">
                                                                                {siteMetadata.headerTitle}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="hidden h-6 w-full text-3xl font-bold leading-tight tracking-tight text-titleColorLM dark:text-neutral-100 sm:block md:text-3xl">
                                                                                {siteMetadata.headerTitle}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <form onSubmit={handleSubmit(onSubmit)}>
                                                            <p className="mb-4 text-subTitleLM dark:text-neutral-200">{`${siteInfo.loginTitle}`}</p>
                                                            {/* <!--Username input--> */}
                                                            <Input
                                                                type={'email'}
                                                                label={'Email'}
                                                                name={'email'}
                                                                register={register}
                                                                error={errors.email}
                                                                css="w-full"
                                                            />

                                                            {/* <!--Password input--> */}
                                                            <Input
                                                                type={'password'}
                                                                label={'Password'}
                                                                name={'password'}
                                                                register={register}
                                                                error={errors.password}
                                                                css="w-full"
                                                            />

                                                            {/* <!--Submit button--> */}
                                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                                <div className="w-full">
                                                                    <button
                                                                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-txtWhite "
                                                                        style={{
                                                                            background:
                                                                                'linear-gradient(to right, #235475, #56a4d9, #3e95d0, #1495ea)',
                                                                        }}
                                                                        type="submit"
                                                                    >
                                                                        Log in
                                                                    </button>
                                                                    <UserButton afterSignOutUrl="/" />
                                                                </div>

                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>

                                                {/* <!-- Right column container with background and description--> */}
                                                <DescComponent title={siteInfo.title} description={siteInfo.description} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            }
        </>
    )
};

const StyledLink = styled(Link)`
    position: relative;
    color: ${({ theme }) => theme.text.main};
    display: block;
    transition: text-decoration 0.3s ease;

    &:hover {
        text-decoration: underline;
    }
`;
