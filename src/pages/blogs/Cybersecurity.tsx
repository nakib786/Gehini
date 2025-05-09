import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../../components/blocks/hero-section';
import BlogSectionBreak from '../../components/BlogSectionBreak';
import BlogIllustrationContainer from '../../components/BlogIllustrationContainer';
import BlogKeyPoint from '../../components/BlogKeyPoint';

const CybersecurityBlog = () => {
  return (
    <div className="dark:bg-[#111111] bg-light">
      <PageHero 
        title="Protecting Your Child Online: A Parent's Guide to Cybersecurity"
        subtitle="Learn essential steps to safeguard your children's digital presence and teach them responsible online behavior"
        accentText="Cybersecurity"
      />

      <article className="py-16 md:py-24">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center text-sm dark:text-gray-400 text-gray-500 mb-8"
          >
            <img 
              src="/images/avatars/placeholder-male.svg" 
              alt="Prof. Vikram Singh" 
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <span className="dark:text-gray-300 text-gray-700 font-medium">Prof. Vikram Singh</span>
              <span className="mx-2">•</span>
              <span>May 5, 2025</span>
              <span className="mx-2">•</span>
              <span>8 min read</span>
            </div>
          </motion.div>

          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center dark:text-white text-gray-700 font-medium hover:text-primary transition duration-300">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Articles
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="/images/blog/cybersecurity.svg" 
              alt="Cybersecurity" 
              className="rounded-xl w-full h-80 object-cover mb-10"
            />

            <div className="prose prose-lg max-w-none dark:prose-invert dark:text-gray-300 text-gray-700">
              <p>
                In today's digital age, children are growing up surrounded by technology. While the internet offers tremendous educational and social benefits, it also presents unique challenges and risks. As parents, understanding these risks and implementing appropriate safeguards is crucial to ensuring our children's safety online.
              </p>

              <BlogIllustrationContainer 
                category="Cybersecurity" 
                title="Protection in the digital age"
                position="right"
              />

              <h2>Understanding the Digital Landscape</h2>
              <p>
                Today's children are digital natives, often more comfortable with technology than their parents. By age 12, most children have their own smartphone, and elementary school students regularly use tablets and computers for schoolwork. This early and extensive exposure to technology brings both opportunities and risks.
              </p>
              
              <BlogKeyPoint
                category="Cybersecurity"
                point="Children often develop technical skills rapidly, but their judgment and awareness of online risks lags behind their technical abilities."
              />
              
              <p>
                Common online risks for children include:
              </p>
              <ul>
                <li>Exposure to inappropriate content</li>
                <li>Online predators</li>
                <li>Cyberbullying</li>
                <li>Privacy breaches</li>
                <li>Identity theft</li>
                <li>Digital addiction</li>
              </ul>
              <p>
                Rather than responding with fear or excessive restrictions, parents should approach these challenges with knowledge, open communication, and appropriate technological safeguards.
              </p>

              <BlogSectionBreak category="Cybersecurity" />

              <h2>Essential Cybersecurity Measures for Parents</h2>
              
              <h3>1. Implement Robust Password Practices</h3>
              <p>
                Strong password habits form the foundation of online security. Teach your children to:
              </p>
              <ul>
                <li>Create unique, complex passwords for different accounts</li>
                <li>Never share passwords with friends</li>
                <li>Use password managers when appropriate (especially for teens)</li>
                <li>Enable two-factor authentication for important accounts</li>
              </ul>
              <p>
                For younger children, consider creating and managing their passwords yourself, gradually involving them in the process as they mature.
              </p>

              <BlogIllustrationContainer 
                category="Cybersecurity" 
                title="Privacy as a priority"
                position="left"
              />

              <h3>2. Configure Privacy Settings</h3>
              <p>
                Many apps and platforms have default settings that share more information than necessary. Take time to:
              </p>
              <ul>
                <li>Review and adjust privacy settings on all devices, apps, and accounts your child uses</li>
                <li>Disable location sharing except when absolutely necessary</li>
                <li>Review app permissions regularly (camera, microphone, contacts, etc.)</li>
                <li>Set social media accounts to private</li>
              </ul>
              <p>
                Make this a regular practice, as privacy settings often change with updates.
              </p>

              <h3>3. Use Parental Controls and Monitoring Software</h3>
              <p>
                Technological tools can provide an additional layer of protection:
              </p>
              <ul>
                <li>Content filters to block inappropriate websites and content</li>
                <li>Time management features to limit screen time</li>
                <li>App approval processes for downloading new applications</li>
                <li>Activity monitoring to understand your child's digital behavior</li>
              </ul>
              
              <BlogKeyPoint
                category="Cybersecurity"
                point="Parental controls are most effective when paired with ongoing conversations about online safety and responsible digital citizenship."
              />
              
              <p>
                Remember that these tools should complement, not replace, ongoing conversations about online safety.
              </p>

              <h3>4. Secure Your Home Network</h3>
              <p>
                Your home's internet connection is the gateway to your family's online activities:
              </p>
              <ul>
                <li>Use a strong, unique password for your Wi-Fi network</li>
                <li>Enable WPA3 encryption if available</li>
                <li>Keep router firmware updated</li>
                <li>Consider a router with built-in parental controls</li>
                <li>Set up a guest network for visitors</li>
              </ul>
              <p>
                These measures help prevent unauthorized access to your home network and the devices connected to it.
              </p>

              <BlogSectionBreak category="Cybersecurity" />

              <h2>Building Digital Literacy and Responsibility</h2>
              
              <BlogIllustrationContainer 
                category="Cybersecurity" 
                title="Developing digital citizens"
                position="right"
              />
              
              <h3>1. Establish Clear Guidelines</h3>
              <p>
                Children thrive with clear boundaries. Create age-appropriate rules regarding:
              </p>
              <ul>
                <li>Screen time limits (both duration and times of day)</li>
                <li>Approved apps, websites, and games</li>
                <li>Social media usage</li>
                <li>Digital etiquette and behavior</li>
                <li>What information should never be shared online</li>
              </ul>
              <p>
                Consider drafting a family media agreement that everyone signs and follows.
              </p>

              <h3>2. Foster Open Communication</h3>
              <p>
                The most powerful protective factor is an environment where children feel comfortable discussing their online experiences:
              </p>
              <ul>
                <li>Create regular opportunities to discuss digital activities</li>
                <li>Ask open-ended questions about their online experiences</li>
                <li>Respond calmly if they report concerning content or interactions</li>
                <li>Make it clear they won't be punished for reporting problems</li>
              </ul>
              
              <BlogKeyPoint
                category="Cybersecurity"
                point="Children who feel comfortable talking about online experiences are more likely to report problems before they escalate."
              />
              
              <p>
                When children know they can come to you without judgment, they're more likely to seek help when needed.
              </p>

              <BlogIllustrationContainer 
                category="Cybersecurity" 
                title="Critical thinking online"
                position="left"
              />

              <h3>3. Teach Critical Thinking Skills</h3>
              <p>
                Help your child develop the ability to evaluate online content and interactions:
              </p>
              <ul>
                <li>How to identify misinformation and fake news</li>
                <li>Warning signs of scams and phishing attempts</li>
                <li>Recognizing when someone online might not be who they claim</li>
                <li>Understanding that online actions have real-world consequences</li>
              </ul>
              <p>
                These critical thinking skills will serve them throughout their digital lives.
              </p>

              <h3>4. Model Healthy Digital Habits</h3>
              <p>
                Children learn by watching. Demonstrate healthy technology use by:
              </p>
              <ul>
                <li>Following the same screen time rules you set for your children</li>
                <li>Putting devices away during family meals and activities</li>
                <li>Respecting others' privacy and consent before posting photos</li>
                <li>Discussing your own strategies for managing digital distractions</li>
              </ul>
              <p>
                Your example is more powerful than any rule you establish.
              </p>

              <BlogSectionBreak category="Cybersecurity" />

              <h2>Age-Specific Considerations</h2>
              
              <BlogIllustrationContainer 
                category="Cybersecurity" 
                title="Age-appropriate guidance"
                position="right"
              />
              
              <h3>Ages 5-8</h3>
              <p>
                Young children need high levels of supervision:
              </p>
              <ul>
                <li>Use devices in common areas with direct supervision</li>
                <li>Focus on educational content and apps</li>
                <li>Introduce basic concepts of privacy and consent</li>
                <li>Strict limits on screen time</li>
              </ul>

              <h3>Ages 9-12</h3>
              <p>
                Tweens begin to explore more independently:
              </p>
              <ul>
                <li>Start conversations about online safety and digital citizenship</li>
                <li>Introduce concepts of digital footprints and online reputation</li>
                <li>Monitor accounts and regularly review online activities together</li>
                <li>Discuss appropriate responses to cyberbullying and inappropriate content</li>
              </ul>
              
              <BlogKeyPoint
                category="Cybersecurity"
                point="The transition from elementary to middle school often coincides with increased digital independence, making it a critical time for cyber education."
              />

              <h3>Ages 13-17</h3>
              <p>
                Teens require more autonomy with ongoing guidance:
              </p>
              <ul>
                <li>Shift from monitoring to mentoring</li>
                <li>Discuss complex topics like digital relationships and sexting</li>
                <li>Help them understand data privacy and the business models of 'free' services</li>
                <li>Prepare them for managing their digital lives independently</li>
                <li>Emphasize the permanence of digital actions</li>
              </ul>
              <p>
                As teens approach adulthood, focus on helping them internalize responsible habits rather than relying on external controls.
              </p>

              <BlogSectionBreak category="Cybersecurity" />

              <h2>Responding to Digital Problems</h2>
              
              <BlogIllustrationContainer 
                category="Cybersecurity" 
                title="Addressing concerns effectively"
                position="left"
              />
              
              <h3>Cyberbullying</h3>
              <p>
                If your child experiences online harassment:
              </p>
              <ul>
                <li>Document evidence (screenshots, messages)</li>
                <li>Use platform reporting tools</li>
                <li>Contact school officials if classmates are involved</li>
                <li>Focus on supporting your child emotionally</li>
                <li>Consider involving law enforcement for serious threats</li>
              </ul>

              <h3>Exposure to Inappropriate Content</h3>
              <p>
                When children encounter disturbing material:
              </p>
              <ul>
                <li>Respond calmly rather than with shock or anger</li>
                <li>Ask open-ended questions about what they saw</li>
                <li>Address any misconceptions</li>
                <li>Review and strengthen content filtering</li>
                <li>Use the incident as a teaching opportunity</li>
              </ul>

              <h3>Privacy Breaches</h3>
              <p>
                If personal information is compromised:
              </p>
              <ul>
                <li>Change passwords immediately</li>
                <li>Contact relevant platforms</li>
                <li>Monitor accounts for suspicious activity</li>
                <li>Consider credit freezes for identity theft concerns</li>
                <li>Review what information was shared and potential consequences</li>
              </ul>

              <h2>Conclusion: Balance, Not Fear</h2>
              <p>
                The goal of cybersecurity education isn't to make children fearful of technology but to empower them to use it wisely. By combining technological protections with ongoing education and open communication, parents can help children develop into responsible digital citizens who enjoy the benefits of the online world while minimizing its risks.
              </p>
              <p>
                Remember that digital parenting is a continuous journey that evolves as both technology and your child develop. Stay informed, remain engaged, and focus on building your child's internal compass for navigating the digital world safely and responsibly.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Share this article</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-2 rounded-full dark:bg-gray-800 bg-gray-100 dark:text-white text-gray-700 hover:bg-primary hover:text-white transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full dark:bg-gray-800 bg-gray-100 dark:text-white text-gray-700 hover:bg-primary hover:text-white transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full dark:bg-gray-800 bg-gray-100 dark:text-white text-gray-700 hover:bg-primary hover:text-white transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-16 flex justify-between">
              <Link to="/blog" className="inline-flex items-center dark:text-white text-gray-700 font-medium hover:text-primary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Articles
              </Link>
              <Link to="/contact" className="inline-flex items-center dark:text-white text-gray-700 font-medium hover:text-primary">
                Have a Question?
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
};

export default CybersecurityBlog; 