import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import CoursePageConfigCard from './course-page/CoursePageConfigCard';
import messages from './messages';

// XXX this is just for testing and should be removed ASAP
const coursePages = [
  {
    id: 'cp-discussion',
    title: 'Discussion',
    isEnabled: false,
    showSettings: false,
    showStatus: false,
    showEnable: true,
    description: 'Encourage participation and engagement in your course with discussion forums',
  },
  {
    id: 'cp-teams',
    title: 'Teams',
    isEnabled: true,
    showSettings: true,
    showStatus: true,
    showEnable: false,
    description: 'Leverage teams to allow learners to connect by topic of interest',
  },
  {
    id: 'cp-progress',
    title: 'Progress',
    isEnabled: false,
    showSettings: true,
    showStatus: true,
    showEnable: false,
    description: 'Allow students to track their progress throughout the course lorem ipsum',
  },
  {
    id: 'cp-textbooks',
    title: 'Textbooks',
    isEnabled: true,
    showSettings: true,
    showStatus: true,
    showEnable: false,
    description: 'Provide links to applicable resources for your course',
  },
  {
    id: 'cp-notes',
    title: 'Notes',
    isEnabled: true,
    showSettings: true,
    showStatus: true,
    showEnable: false,
    description: 'Support individual note taking that is visible only to the students',
  },
  {
    id: 'cp-wiki',
    title: 'Wiki',
    isEnabled: false,
    showSettings: false,
    showStatus: false,
    showEnable: true,
    description: 'Share your wiki content to provide additional course material',
  },
];

function CoursePageResources({ intl, courseId }) {
  const { config } = useContext(AppContext);
  const lmsCourseURL = `${config.LMS_BASE_URL}/courses/${courseId}`;
  return (
    <main>
      <div className="container-fluid bg-info-100">
        <div className="d-flex justify-content-between align-items-center border-bottom">
          <h1 className="mt-3 text-info-500">{intl.formatMessage(messages.heading)}</h1>
          <a className="btn btn-primary" href={lmsCourseURL} role="button">
            {intl.formatMessage(messages['viewLive.button'])}
          </a>
        </div>
        <div className="text-info-500">
          <h3 className="mt-3">
            {intl.formatMessage(messages['pages.subheading'])}
          </h3>
          <div className="d-flex flex-wrap align-items-stretch justify-content-around">
            {coursePages.map((coursePage) => (
              <div
                className="d-flex flex-column align-content-stretch p-3 col-sm-12 col-md-6 col-lg-4"
                key={coursePage.id}
              >
                <CoursePageConfigCard coursePage={coursePage} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-info-500">{intl.formatMessage(messages['resources.subheading'])}</h3>
          <div className="row bg-white text-info-500 border shadow justify-content-center align-items-center my-3 mx-1">
            <div className="col-1 font-weight-bold">{intl.formatMessage(messages['resources.custom.title'])}</div>
            <div className="col-8 my-3">
              {intl.formatMessage(messages['resources.custom.description'])}
            </div>
            <div className="col-2 text-right">
              <a className="btn btn-outline-info" href="/#" role="button">
                {intl.formatMessage(messages['resources.newPage.button'])}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

CoursePageResources.propTypes = {
  intl: intlShape.isRequired,
  courseId: PropTypes.string.isRequired,
};

export default injectIntl(CoursePageResources);
