import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/family/familySlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const FamilyView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { family } = useAppSelector((state) => state.family);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View family')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View family')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{family?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Family</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.users_family &&
                      Array.isArray(family.users_family) &&
                      family.users_family.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!family?.users_family?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Activities family</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ActivityName</th>

                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.activities_family &&
                      Array.isArray(family.activities_family) &&
                      family.activities_family.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/activities/activities-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='type'>{item.type}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!family?.activities_family?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Chats family</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Message</th>

                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.chats_family &&
                      Array.isArray(family.chats_family) &&
                      family.chats_family.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/chats/chats-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='message'>{item.message}</td>

                          <td data-label='timestamp'>
                            {dataFormatter.dateTimeFormatter(item.timestamp)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!family?.chats_family?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Dashboards family</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Schedule</th>

                      <th>MoodCheck-In</th>

                      <th>GoalTracker</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.dashboards_family &&
                      Array.isArray(family.dashboards_family) &&
                      family.dashboards_family.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/dashboards/dashboards-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='schedule'>{item.schedule}</td>

                          <td data-label='mood_check_in'>
                            {item.mood_check_in}
                          </td>

                          <td data-label='goal_tracker'>{item.goal_tracker}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!family?.dashboards_family?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Families family</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>FamilyName</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.families_family &&
                      Array.isArray(family.families_family) &&
                      family.families_family.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/families/families-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!family?.families_family?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Notifications family</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Content</th>

                      <th>SentAt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.notifications_family &&
                      Array.isArray(family.notifications_family) &&
                      family.notifications_family.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/notifications/notifications-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='content'>{item.content}</td>

                          <td data-label='sent_at'>
                            {dataFormatter.dateTimeFormatter(item.sent_at)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!family?.notifications_family?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Screen_time_analyses family
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>UsageHours</th>

                      <th>Recommendations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.screen_time_analyses_family &&
                      Array.isArray(family.screen_time_analyses_family) &&
                      family.screen_time_analyses_family.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/screen_time_analyses/screen_time_analyses-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='usage_hours'>{item.usage_hours}</td>

                          <td data-label='recommendations'>
                            {item.recommendations}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!family?.screen_time_analyses_family?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/family/family-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

FamilyView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_FAMILY'}>{page}</LayoutAuthenticated>
  );
};

export default FamilyView;
