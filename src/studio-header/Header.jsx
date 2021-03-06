/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Responsive from 'react-responsive';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform';
import {
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import messages from './Header.messages';

import StudioLogoPNG from './assets/studio-logo.png';
import LmsApiService from '../data/services/LmsApiService';

ensureConfig([
  'STUDIO_BASE_URL',
  'LOGOUT_URL',
  'LOGIN_URL',
], 'Header component');

function Header({ courseId, intl }) {
  const { authenticatedUser, config } = useContext(AppContext);
  const [courseNumber, setCourseNumber] = useState('');
  const [courseOrg, setCourseOrg] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  useEffect(
    () => {
      LmsApiService.getCourseDetailsData(courseId)
        .then(
          response => {
            setCourseNumber(response.data.number);
            setCourseOrg(response.data.org);
            setCourseTitle(response.data.name);
          },
        ).catch(
          () => {
            setCourseNumber('');
            setCourseOrg('');
            setCourseTitle(courseId);
          },
        );
    }, [],
  );

  const mainMenu = [
    {
      type: 'submenu',
      content: intl.formatMessage(messages['header.links.content']),
      submenuContent: (
        <>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/course/${courseId}`}>{intl.formatMessage(messages['header.links.outline'])}</a></div>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/course_info/${courseId}`}>{intl.formatMessage(messages['header.links.updates'])}</a></div>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/tabs/${courseId}`}>{intl.formatMessage(messages['header.links.pages'])}</a></div>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/assets/${courseId}`}>{intl.formatMessage(messages['header.links.filesAndUploads'])}</a></div>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/textbooks/${courseId}`}>{intl.formatMessage(messages['header.links.textbooks'])}</a></div>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/videos/${courseId}`}>{intl.formatMessage(messages['header.links.videoUploads'])}</a></div>
        </>
      ),
    },
    {
      type: 'submenu',
      content: intl.formatMessage(messages['header.links.settings']),
      submenuContent: (
        <>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/settings/details/${courseId}`}>{intl.formatMessage(messages['header.links.scheduleAndDetails'])}</a></div>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/settings/grading/${courseId}`}>{intl.formatMessage(messages['header.links.grading'])}</a></div>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/course_team/${courseId}`}>{intl.formatMessage(messages['header.links.courseTeam'])}</a></div>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/group_configurations/${courseId}`}>{intl.formatMessage(messages['header.links.groupConfigurations'])}</a></div>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/settings/advanced/${courseId}`}>{intl.formatMessage(messages['header.links.advancedSettings'])}</a></div>
        </>
      ),
    },
    {
      type: 'submenu',
      content: intl.formatMessage(messages['header.links.tools']),
      submenuContent: (
        <>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/import/${courseId}`}>{intl.formatMessage(messages['header.links.import'])}</a></div>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/export/${courseId}`}>{intl.formatMessage(messages['header.links.export'])}</a></div>
          <div className="mb-1"><a rel="noopener" href={`${config.STUDIO_BASE_URL}/checklists/${courseId}`}>{intl.formatMessage(messages['header.links.checklists'])}</a></div>
        </>
      ),
    },
  ];

  const studioHomeItem = {
    type: 'item',
    href: config.STUDIO_BASE_URL,
    content: intl.formatMessage(messages['header.user.menu.studio']),
  };

  const logoutItem = {
    type: 'item',
    href: config.LOGOUT_URL,
    content: intl.formatMessage(messages['header.user.menu.logout']),
  };

  let userMenu = [];

  if (authenticatedUser !== null) {
    if (authenticatedUser.administrator) {
      userMenu = [
        studioHomeItem,
        {
          type: 'item',
          href: `${config.STUDIO_BASE_URL}/maintenance`,
          content: intl.formatMessage(messages['header.user.menu.maintenance']),
        },
        logoutItem,
      ];
    } else {
      userMenu = [
        studioHomeItem,
        logoutItem,
      ];
    }
  }

  const courseLockUp = (
    <a
      className="course-title-lockup"
      style={{ lineHeight: 1 }}
      href={`${config.STUDIO_BASE_URL}/course/${courseId}`}
      aria-label={intl.formatMessage(messages['header.label.courseOutline'])}
    >
      <span className="d-block small m-0" data-test-id="course-org-number">{courseOrg} {courseNumber}</span>
      <span className="d-block m-0 font-weight-bold" data-test-id="course-title">{courseTitle}</span>
    </a>
  );

  const props = {
    logo: StudioLogoPNG,
    logoAltText: 'Studio edX',
    siteName: 'edX',
    logoDestination: config.STUDIO_BASE_URL,
    courseLockUp,
    courseId,
    username: authenticatedUser !== null ? authenticatedUser.username : null,
    avatar: authenticatedUser !== null ? authenticatedUser.avatar : null,
    mainMenu,
    userMenu,
  };
  return (
    <>
      <Responsive maxWidth={768}>
        <MobileHeader {...props} />
      </Responsive>
      <Responsive minWidth={769}>
        <DesktopHeader {...props} />
      </Responsive>
    </>
  );
}

Header.propTypes = {
  courseId: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Header);
