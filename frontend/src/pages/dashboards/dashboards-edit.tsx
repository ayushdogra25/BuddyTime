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

import { update, fetch } from '../../stores/dashboards/dashboardsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditDashboardsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    user: '',

    schedule: '',

    mood_check_in: '',

    goal_tracker: '',

    family: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { dashboards } = useAppSelector((state) => state.dashboards);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof dashboards === 'object') {
      setInitialValues(dashboards);
    }
  }, [dashboards]);

  useEffect(() => {
    if (typeof dashboards === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = dashboards[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [dashboards]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/dashboards/dashboards-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit dashboards')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit dashboards'}
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

              <FormField label='Schedule' hasTextareaHeight>
                <Field name='schedule' as='textarea' placeholder='Schedule' />
              </FormField>

              <FormField label='MoodCheck-In' hasTextareaHeight>
                <Field
                  name='mood_check_in'
                  as='textarea'
                  placeholder='MoodCheck-In'
                />
              </FormField>

              <FormField label='GoalTracker' hasTextareaHeight>
                <Field
                  name='goal_tracker'
                  as='textarea'
                  placeholder='GoalTracker'
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
                  onClick={() => router.push('/dashboards/dashboards-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditDashboardsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DASHBOARDS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDashboardsPage;
