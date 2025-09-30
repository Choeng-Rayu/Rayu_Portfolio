# ResQNet Project Charter
**A Web-Based and Mobile Disaster Management System**

---

## Document Information

| **Item** | **Details** |
|----------|-------------|
| **Project Name** | ResQNet – Disaster Management System |
| **Version** | 1.0 |
| **Date** | 2025-09-30 |
| **Project Manager** | Choeng Rayu |
| **Status** | Approved |

---

## 1. Executive Summary

ResQNet is a unified disaster management platform designed to connect prediction, real-time alerts, resource coordination, and crowdsourced reporting to improve preparedness, response, and recovery during natural disasters and emergencies.

### Vision
To create a comprehensive, accessible, and reliable disaster management system that saves lives through early warnings, efficient resource coordination, and community engagement.

### Mission
Provide tools and technology that enable authorities, responders, and citizens to prepare for, respond to, and recover from disasters effectively.

---

## 2. Project Objectives

### Primary Goals
1. Develop an early warning prediction system with multi-channel alert capabilities
2. Create interactive mapping features with real-time disaster zones and evacuation routes
3. Build a resource coordination dashboard for emergency responders
4. Implement public SOS reporting with geolocation tracking
5. Deliver both web and mobile applications for maximum accessibility

### Success Criteria
- ✅ System processes and sends alerts within 60 seconds of disaster detection
- ✅ Multi-channel notifications reach 95%+ of registered users
- ✅ Mobile and web apps achieve 99% uptime during non-disaster periods
- ✅ Resource coordination dashboard updates in real-time (<5 second latency)
- ✅ System successfully handles 10,000+ concurrent users during emergencies

---

## 3. Project Management Triangle

### Scope (Deliverables & Features)

#### Core Features
1. **Prediction and Alert System**
   - AI/ML-based disaster prediction algorithms
   - Integration with weather and seismic data sources
   - Automated alert triggering mechanism

2. **Multi-Channel Notifications**
   - Mobile app push notifications
   - SMS alerts via gateway integration
   - Telegram bot notifications
   - Email alerts

3. **Interactive Mapping**
   - Real-time disaster zone visualization
   - Evacuation route mapping
   - Safe zone identification
   - Geolocation services

4. **Coordination Dashboard**
   - Resource allocation and tracking
   - Team assignment and management
   - Real-time status updates
   - Analytics and reporting

5. **Public SOS Reporting**
   - User authentication system
   - Geolocation-based SOS submission
   - Request tracking and status updates
   - Priority queue management

#### Out of Scope (Future Considerations)
- Advanced disaster simulation modeling (may be cut if timeline tight)
- Integration with international alert systems
- Offline mobile app functionality
- Multi-language support beyond English

---

### Time (Duration & Deadlines)

**Total Duration:** 12 weeks (3 months)

#### Month 1: Foundation (Weeks 1–4)
- **Week 1:** Project initiation, environment setup, stakeholder approval
- **Week 2:** Architecture design, database schema, planning sprints
- **Week 3-4:** Core prediction algorithms, multi-channel alert system development

**Deliverable:** Working prediction engine with alert distribution to app, SMS, and Telegram

---

#### Month 2: Core Features (Weeks 5–8)
- **Week 5-6:** Interactive mapping with Leaflet.js, disaster zones, evacuation routes
- **Week 7-8:** Resource coordination dashboard, real-time updates, team assignments

**Deliverable:** Functional mapping system and coordination dashboard

---

#### Month 3: Integration & Launch (Weeks 9–12)
- **Week 9:** Public interface, authentication, SOS reporting with geolocation
- **Week 10:** Simulation features, analytics dashboard
- **Week 11:** Full system testing, bug fixes, performance optimization
- **Week 12:** Deployment, documentation, final presentation

**Final Delivery:** Week 12 (End of Month 3)

---

### Cost (Resources)

#### Human Resources
- 4 Student Developers (full-time equivalent for 3 months)
- 1 Faculty Advisor (consultation and guidance)

#### Technology Stack
| **Category** | **Technology** | **Purpose** |
|--------------|----------------|-------------|
| Frontend | React.js | Web application UI |
| Mobile | React Native | Cross-platform mobile app |
| Backend | Node.js + Express | API and business logic |
| Database | MongoDB / PostgreSQL | Data persistence |
| Mapping | Leaflet.js | Interactive maps |
| Real-time | WebSocket | Live updates |
| Hosting | AWS / Google Cloud | Cloud infrastructure |
| Notifications | Twilio (SMS) | SMS gateway |
| Messaging | Telegram Bot API | Telegram alerts |

#### Budget Breakdown
| **Item** | **Estimated Cost** | **Notes** |
|----------|-------------------|-----------|
| Cloud Hosting | $35,000 | AWS/GCP with auto-scaling |
| SMS Gateway | $25,000 | Twilio or similar service |
| Domain & SSL | $500 | Annual registration |
| Development Tools | $5,000 | IDEs, testing tools, subscriptions |
| API Integrations | $10,000 | Weather data, maps, external services |
| Testing & QA | $8,000 | Performance and security testing |
| Contingency (15%) | $16,500 | Buffer for unexpected costs |
| **Total Budget** | **$100,000** | |

---

### Trade-offs & Constraints

#### If Time is Reduced
- ⚠️ Cut advanced simulation features
- ⚠️ Reduce analytics depth
- ⚠️ Simplify UI/UX in some areas

#### If Budget is Limited
- ⚠️ Use free cloud tiers (limited scaling)
- ⚠️ Reduce SMS usage, prioritize app notifications
- ⚠️ Leverage open-source alternatives

#### If Scope Expands
- ⚠️ Require 2–4 additional weeks
- ⚠️ Increase budget by 20–30%
- ⚠️ May need additional developer resources

---

## 4. Project Management Life Cycle

### Phase 1: Initiation (Week 1)
**Key Activities:**
- Define project objectives and success criteria
- Identify stakeholders (disaster management authorities, emergency responders, public)
- Approve project charter
- Conduct initial risk assessment
- Set up communication channels

**Deliverables:**
- Approved Project Charter
- Stakeholder Register
- Initial Risk Assessment Document

---

### Phase 2: Planning (Weeks 1–2)
**Key Activities:**
- Create detailed Work Breakdown Structure (WBS)
- Design system architecture and database schema
- Plan sprint cycles (6 sprints, 2 weeks each)
- Define communication protocols (daily stand-ups, sprint reviews)
- Prepare risk management and contingency plans
- Set up development environment and repositories

**Deliverables:**
- Project Plan with WBS
- System Architecture Document
- Database Design Document
- Sprint Planning Schedule
- Risk Management Plan
- Communication Plan

---

### Phase 3: Execution (Weeks 2–11)

#### Sprint 1-2: Prediction & Alerts (Weeks 2-5)
- Develop prediction algorithms
- Build multi-channel alert system (SMS, app, Telegram)
- Create admin interface for alert management

#### Sprint 3: Mapping Features (Weeks 6-7)
- Integrate Leaflet.js mapping
- Implement disaster zone visualization
- Add evacuation route mapping

#### Sprint 4: Coordination Dashboard (Weeks 8-9)
- Build resource tracking system
- Develop team assignment features
- Implement real-time updates with WebSocket

#### Sprint 5: Public Interface & SOS (Weeks 9-10)
- Create user authentication system
- Develop SOS reporting with geolocation
- Build request tracking interface

#### Sprint 6: Simulation & Analytics (Weeks 10-11)
- Add disaster simulation features (if time permits)
- Develop analytics dashboard
- Create reporting tools

**Deliverables (by Sprint):**
- Working prediction and alert system
- Interactive mapping module
- Coordination dashboard
- Public SOS reporting system
- Analytics and simulation tools

---

### Phase 4: Monitoring & Controlling (Weeks 2–12)
**Ongoing Activities:**
- Daily stand-up meetings (15 minutes)
- Sprint reviews and retrospectives (end of each sprint)
- Track progress with burndown charts
- Monitor and manage bugs via issue tracking
- Conduct code reviews
- Assess and mitigate risks continuously
- Performance monitoring and optimization

**Key Metrics:**
- Sprint velocity and completion rate
- Bug count and resolution time
- Code coverage and quality metrics
- Performance benchmarks (response time, uptime)

---

### Phase 5: Closing (Week 12)
**Key Activities:**
- Comprehensive system testing (functional, performance, security)
- User acceptance testing (UAT)
- System deployment to production
- Create user manuals and technical documentation
- Final project presentation
- Conduct lessons learned session
- Archive project documentation

**Deliverables:**
- Deployed ResQNet System (web + mobile)
- User Documentation
- Technical Documentation
- Final Project Report
- Lessons Learned Document
- Project Presentation

---

## 5. Team Structure & Roles

### Organizational Chart

```
                    Faculty Advisor
                          |
                  Project Manager
                    (Choeng Rayu)
                          |
        __________________|__________________
       |                  |                  |
  Tep Somnang      Lon Mengheng        Tet Elite
  (Frontend)       (Integration)      (Architecture)
```

---

### Role Definitions

#### 1. Choeng Rayu – Project Manager & Backend Lead
**Responsibilities:**
- Overall project coordination and leadership
- Team communication and conflict resolution
- Backend API development (Node.js/Express)
- Database design and implementation
- Sprint planning and progress tracking
- Stakeholder communication
- Risk management

**Deliverables:**
- Backend APIs and services
- Database schema
- Project status reports
- Sprint plans and retrospectives

---

#### 2. Tep Somnang – Frontend Developer & UI/UX Lead
**Responsibilities:**
- Web application development (React.js)
- Mobile application development (React Native)
- User interface design and implementation
- User experience optimization
- Responsive design implementation
- Frontend performance optimization

**Deliverables:**
- Web application UI
- Mobile application UI
- UI/UX design mockups
- Frontend component library

---

#### 3. Lon Mengheng – Full-Stack Developer & Integration Specialist
**Responsibilities:**
- System integration (frontend-backend)
- API integration (external services, SMS, Telegram)
- WebSocket implementation for real-time features
- Third-party service integration
- Cross-platform testing
- DevOps support (deployment, CI/CD)

**Deliverables:**
- API integrations
- Real-time communication system
- Integration test suites
- Deployment scripts

---

#### 4. Tet Elite – Systems Architect & Prediction Lead
**Responsibilities:**
- System architecture design
- Disaster prediction algorithm development
- Data modeling and analysis
- Performance optimization
- Security architecture
- Technical documentation
- Technology research and recommendations

**Deliverables:**
- System architecture documentation
- Prediction algorithms
- Data models
- Performance benchmarks
- Technical specifications

---

#### Faculty Advisor
**Responsibilities:**
- Provide guidance and mentorship
- Review project milestones
- Offer technical expertise
- Connect with industry stakeholders
- Approve major decisions

---

## 6. Stakeholders

| **Stakeholder** | **Role** | **Interest** | **Influence** |
|-----------------|----------|--------------|---------------|
| Disaster Management Authorities | End User | High | High |
| Emergency Responders | End User | High | Medium |
| General Public | End User | High | Low |
| Faculty Advisor | Mentor | Medium | High |
| Development Team | Implementer | High | High |
| University Administration | Sponsor | Medium | Medium |
| Technology Partners | Vendor | Low | Low |

---

## 7. Risk Management

### High-Priority Risks

| **Risk** | **Probability** | **Impact** | **Mitigation Strategy** |
|----------|-----------------|------------|-------------------------|
| Integration complexity delays timeline | High | High | Start integration early, allocate extra time for Sprint 4 |
| SMS gateway costs exceed budget | Medium | High | Use rate limiting, prioritize app notifications, negotiate with vendors |
| Prediction algorithm accuracy issues | Medium | High | Use proven ML models, validate with historical data, build in manual override |
| Team member unavailability | Medium | Medium | Cross-train team members, maintain clear documentation |
| Cloud infrastructure costs | Low | High | Use auto-scaling, monitor usage closely, set up budget alerts |
| Data privacy and security concerns | Low | High | Implement encryption, follow GDPR/privacy standards, security audits |

### Risk Response Plan
- **Weekly risk reviews** during stand-ups
- **Escalation protocol** for high-impact risks
- **Contingency budget** (15% of total) for unexpected issues
- **Regular backups** and disaster recovery plan for the system itself

---

## 8. Communication Plan

### Meeting Schedule

| **Meeting Type** | **Frequency** | **Duration** | **Participants** | **Purpose** |
|------------------|---------------|--------------|------------------|-------------|
| Daily Stand-up | Daily | 15 min | All developers | Progress updates, blockers |
| Sprint Planning | Every 2 weeks | 2 hours | All team | Plan next sprint |
| Sprint Review | Every 2 weeks | 1.5 hours | All team + Advisor | Demo and feedback |
| Sprint Retrospective | Every 2 weeks | 1 hour | All developers | Process improvement |
| Advisor Check-in | Weekly | 30 min | PM + Advisor | Guidance and approvals |

### Communication Channels
- **Slack/Discord:** Daily communication
- **GitHub:** Code repository, issue tracking, documentation
- **Jira/Trello:** Sprint and task management
- **Google Drive:** Document sharing
- **Zoom/Meet:** Virtual meetings

---

## 9. Success Metrics & KPIs

### Technical KPIs
- ✅ **System Uptime:** 99%+ during non-emergency periods
- ✅ **Alert Delivery Time:** <60 seconds from detection
- ✅ **API Response Time:** <500ms for 95% of requests
- ✅ **Mobile App Performance:** <3 second load time
- ✅ **Bug Resolution:** Critical bugs fixed within 24 hours

### Project Management KPIs
- ✅ **Sprint Completion Rate:** 85%+ of planned tasks
- ✅ **Budget Variance:** Within 10% of planned budget
- ✅ **Schedule Variance:** Deliver on time (Week 12)
- ✅ **Code Quality:** 80%+ test coverage
- ✅ **Team Velocity:** Consistent sprint-to-sprint

### User Success Metrics
- ✅ **User Registration:** 1,000+ users in first month post-launch
- ✅ **Alert Open Rate:** 70%+ of alerts opened
- ✅ **SOS Response Time:** Average <10 minutes to acknowledge
- ✅ **User Satisfaction:** 4+ stars in app store ratings

---

## 10. Assumptions & Constraints

### Assumptions
- Team members are available full-time for 12 weeks
- Access to necessary APIs and data sources (weather, seismic)
- Cloud infrastructure will scale as needed
- SMS gateway rates remain stable
- No major changes in project scope mid-development

### Constraints
- **Budget:** Fixed at $100,000
- **Timeline:** Must complete in 12 weeks
- **Resources:** 4 developers only
- **Technology:** Must use approved tech stack
- **Compliance:** Must follow data privacy regulations

---

## 11. Quality Management

### Quality Assurance Process
1. **Code Reviews:** All code must be reviewed by at least one peer
2. **Automated Testing:** Unit tests, integration tests, end-to-end tests
3. **Continuous Integration:** Automated builds and tests on every commit
4. **Performance Testing:** Load testing before each sprint demo
5. **Security Scanning:** Automated security vulnerability scans
6. **User Acceptance Testing:** Stakeholder testing in Week 11

### Quality Standards
- Follow coding standards (ESLint, Prettier)
- Maintain 80%+ code coverage
- Zero critical security vulnerabilities
- Accessibility compliance (WCAG 2.1 AA)
- Mobile responsiveness across devices

---

## 12. Project Deliverables Summary

### Final Deliverables (Week 12)

#### 1. Software Products
- ✅ ResQNet Web Application (production-ready)
- ✅ ResQNet Mobile Application (iOS & Android)
- ✅ Admin Dashboard for disaster management
- ✅ API Documentation (Swagger/OpenAPI)

#### 2. Documentation
- ✅ User Manual (for public users)
- ✅ Admin Guide (for disaster authorities)
- ✅ Technical Documentation (architecture, API, database)
- ✅ Deployment Guide
- ✅ Source Code (with README)

#### 3. Project Management Documents
- ✅ Final Project Report
- ✅ Lessons Learned Document
- ✅ Test Results and QA Reports
- ✅ Final Presentation Slides

---

## 13. Approval & Sign-off

### Charter Approval

| **Name** | **Role** | **Signature** | **Date** |
|----------|----------|---------------|----------|
| Choeng Rayu | Project Manager | _________________ | ________ |
| Tep Somnang | Frontend Lead | _________________ | ________ |
| Lon Mengheng | Integration Specialist | _________________ | ________ |
| Tet Elite | Systems Architect | _________________ | ________ |
| [Advisor Name] | Faculty Advisor | _________________ | ________ |

---

## 14. References & Resources

### Technical Resources
- React.js Documentation: https://react.dev
- Node.js Documentation: https://nodejs.org
- Leaflet.js Documentation: https://leafletjs.com
- WebSocket API: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

### Project Management Resources
- PMBOK Guide (Project Management Body of Knowledge)
- Agile Scrum Framework
- GitHub Project Management Tools

### Domain Research
- Disaster Management Best Practices
- Emergency Alert System Standards
- Geolocation and Mapping APIs

---

## Appendices

### Appendix A: Work Breakdown Structure (WBS)
*(To be detailed in separate document)*

### Appendix B: Sprint Plan Details
*(To be detailed in separate document)*

### Appendix C: Database Schema
*(To be detailed in separate document)*

### Appendix D: System Architecture Diagram
*(To be detailed in separate document)*

---

**Document Version History**

| **Version** | **Date** | **Author** | **Changes** |
|-------------|----------|------------|-------------|
| 1.0 | 2025-09-30 | Choeng Rayu | Initial charter creation |

---

**End of Project Charter**