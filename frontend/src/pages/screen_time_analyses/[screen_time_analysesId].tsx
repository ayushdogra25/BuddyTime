import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/screen_time_analyses/screen_time_analysesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditScreen_time_analyses = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    user: '',

    usage_hours: '',

    recommendations: '',

    family: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { screen_time_analyses } = useAppSelector(
    (state) => state.screen_time_analyses,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { screen_time_analysesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: screen_time_analysesId }));
  }, [screen_time_analysesId]);

  useEffect(() => {
    if (typeof screen_time_analyses === 'object') {
      setInitialValues(screen_time_analyses);
    }
  }, [screen_time_analyses]);

  useEffect(() => {
    if (typeof screen_time_analyses === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = screen_time_analyses[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [screen_time_analyses]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: screen_time_analysesId, data }));
    await router.push('/screen_time_analyses/screen_time_analyses-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit screen_time_analyses')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit screen_time_analyses'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='UsageHours'>
                <Field
                  type='number'
                  name='usage_hours'
                  placeholder='UsageHours'
                />
              </FormField>

              <FormField label='Recommendations' hasTextareaHeight>
                <Field
                  name='recommendations'
                  as='textarea'
                  placeholder='Recommendations'
                />
              </FormField>

              <FormField label='family' labelFor='family'>
                <Field
                  name='family'
                  id='family'
                  component={SelectField}
                  options={initialValues.family}
                  itemRef={'family'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push(
                      '/screen_time_analyses/screen_time_analyses-list',
                    )
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditScreen_time_analyses.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_SCREEN_TIME_ANALYSES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditScreen_time_analyses;
