import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../../components/blocks/hero-section';
import BlogSectionBreak from '../../components/BlogSectionBreak';
import BlogIllustrationContainer from '../../components/BlogIllustrationContainer';
import BlogKeyPoint from '../../components/BlogKeyPoint';

const ScienceExperimentsBlog = () => {
  return (
    <div className="dark:bg-[#111111] bg-light">
      <PageHero 
        title="Hands-On Science: 10 Experiments You Can Do at Home"
        subtitle="Engage your child's curiosity with these safe and educational science activities using household materials"
        accentText="Science"
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
              alt="Raj Patel" 
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <span className="dark:text-gray-300 text-gray-700 font-medium">Raj Patel</span>
              <span className="mx-2">•</span>
              <span>April 1, 2025</span>
              <span className="mx-2">•</span>
              <span>7 min read</span>
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
              src="/images/blog/science.svg" 
              alt="Science Experiments" 
              className="rounded-xl w-full h-80 object-cover mb-10"
            />

            <div className="prose prose-lg max-w-none dark:prose-invert dark:text-gray-300 text-gray-700">
              <p>
                Science doesn't just happen in laboratories with expensive equipment and white coats. Some of the most powerful learning experiences can take place right in your own home, using materials you already have on hand. These hands-on experiments engage children's natural curiosity while teaching fundamental scientific concepts and critical thinking skills.
              </p>
              
              <BlogKeyPoint
                category="Science"
                point="Hands-on experimentation helps children develop critical thinking skills and a deeper understanding of scientific concepts than textbook learning alone."
              />
              
              <p>
                We've compiled 10 fascinating, safe, and educational science activities suitable for elementary and middle school students. Each experiment includes simple instructions, explanations of the science behind it, and suggestions for extending the learning.
              </p>

              <BlogIllustrationContainer 
                category="Science" 
                title="Colorful chemistry in action"
                position="right"
              />

              <h2>Experiment 1: Rainbow Milk</h2>
              <p><strong>Difficulty:</strong> Easy | <strong>Time:</strong> 5 minutes | <strong>Age range:</strong> 4-10</p>
              <p><strong>Materials:</strong></p>
              <ul>
                <li>Shallow dish or plate</li>
                <li>Whole milk (works better than skim)</li>
                <li>Food coloring (various colors)</li>
                <li>Dish soap</li>
                <li>Cotton swab</li>
              </ul>
              <p><strong>Instructions:</strong></p>
              <ol>
                <li>Pour enough milk to cover the bottom of the plate (about 1/2 inch deep)</li>
                <li>Add several drops of different food colors spread out across the surface</li>
                <li>Dip the tip of a cotton swab in dish soap</li>
                <li>Touch the soapy swab to the surface of the milk and watch the explosion of color!</li>
              </ol>
              <p><strong>The Science:</strong> The dish soap disrupts the surface tension of the milk and interacts with the fat molecules, causing movement that creates swirling patterns with the food coloring. This demonstrates concepts of surface tension, molecular polarity, and chemical reactions.</p>
              <p><strong>Extension:</strong> Try the experiment with different types of milk (skim, 2%, whole) and compare the results. What happens when you use water instead of milk?</p>

              <BlogSectionBreak category="Science" />

              <h2>Experiment 2: Homemade Lava Lamp</h2>
              <p><strong>Difficulty:</strong> Easy | <strong>Time:</strong> 10 minutes | <strong>Age range:</strong> 6-12</p>
              
              <BlogIllustrationContainer 
                category="Science" 
                title="Density principles at work"
                position="left"
              />
              
              <p><strong>Materials:</strong></p>
              <ul>
                <li>Clear plastic bottle or tall clear container</li>
                <li>Vegetable oil</li>
                <li>Water</li>
                <li>Food coloring</li>
                <li>Effervescent tablets (like Alka-Seltzer or effervescent vitamin C)</li>
              </ul>
              <p><strong>Instructions:</strong></p>
              <ol>
                <li>Fill the bottle about 2/3 full with vegetable oil</li>
                <li>Fill the remaining space with water, leaving a small gap at the top</li>
                <li>Add several drops of food coloring (the drops will sink through the oil and color the water)</li>
                <li>Break an effervescent tablet into pieces</li>
                <li>Drop a piece into the bottle and watch the "lava lamp" effect</li>
              </ol>
              <p><strong>The Science:</strong> Oil and water don't mix because they have different densities and polarities. The water (with food coloring) sinks below the oil. When you add the tablet, it creates gas bubbles that carry colored water upward. When the bubbles reach the surface and pop, the water drops back down. This illustrates density, polarity, and chemical reactions.</p>
              <p><strong>Extension:</strong> Experiment with different amounts of water and oil. Try adding salt instead of effervescent tablets. What happens?</p>

              <h2>Experiment 3: Walking Water Rainbow</h2>
              <p><strong>Difficulty:</strong> Easy | <strong>Time:</strong> 30+ minutes | <strong>Age range:</strong> 5-10</p>
              <p><strong>Materials:</strong></p>
              <ul>
                <li>6 clear glasses or jars</li>
                <li>Paper towels</li>
                <li>Food coloring (red, yellow, and blue)</li>
                <li>Water</li>
              </ul>
              
              <BlogKeyPoint
                category="Science"
                point="Capillary action is the same process that allows plants to pull water from their roots up to their leaves, demonstrating how nature and science are connected."
              />
              
              <p><strong>Instructions:</strong></p>
              <ol>
                <li>Arrange the glasses in a circle</li>
                <li>Fill alternate glasses with water (1st, 3rd, 5th)</li>
                <li>Add red food coloring to the first glass with water, yellow to the third, and blue to the fifth</li>
                <li>Fold paper towels lengthwise into strips</li>
                <li>Place one end of a paper towel in a glass with colored water and the other end in an empty glass</li>
                <li>Connect all glasses with paper towel bridges</li>
                <li>Watch over the next hour as the water "walks" up the paper towels and creates new colors in the empty glasses</li>
              </ol>
              <p><strong>The Science:</strong> This experiment demonstrates capillary action (how liquid can flow against gravity in narrow spaces) and color mixing. The water moves up the paper towel fibers due to adhesion and cohesion forces, eventually flowing into the empty glasses and creating secondary colors (orange, green, and purple).</p>
              <p><strong>Extension:</strong> Try different types of paper to see which conducts water the best. Predict what colors will form in each empty glass before they appear.</p>

              <BlogSectionBreak category="Science" />

              <h2>Experiment 4: Invisible Ink Message</h2>
              <p><strong>Difficulty:</strong> Easy | <strong>Time:</strong> 15 minutes | <strong>Age range:</strong> 7-12</p>
              
              <BlogIllustrationContainer 
                category="Science" 
                title="Secret messages with chemistry"
                position="right"
              />
              
              <p><strong>Materials:</strong></p>
              <ul>
                <li>Lemon juice or white vinegar</li>
                <li>Small bowl</li>
                <li>Cotton swab or paintbrush</li>
                <li>White paper</li>
                <li>Heat source (lamp with incandescent bulb, iron on low setting, or hair dryer)</li>
              </ul>
              <p><strong>Instructions:</strong></p>
              <ol>
                <li>Pour some lemon juice or vinegar into a small bowl</li>
                <li>Dip a cotton swab or paintbrush into the liquid</li>
                <li>Write a message or draw a picture on the white paper</li>
                <li>Let the paper dry completely (the writing will become invisible)</li>
                <li>To reveal the message, carefully hold the paper near a heat source until the writing appears (brownish color)</li>
              </ol>
              <p><strong>The Science:</strong> Lemon juice and vinegar contain carbon compounds that are colorless at room temperature. When heated, these compounds oxidize and turn brown, revealing the message. This demonstrates chemical changes triggered by heat and the concept of oxidation.</p>
              <p><strong>Extension:</strong> Try different acidic liquids (orange juice, apple juice, etc.) to see which works best. Experiment with different papers to see how that affects the results.</p>

              <h2>Experiment 5: Homemade Slime</h2>
              <p><strong>Difficulty:</strong> Medium | <strong>Time:</strong> 15 minutes | <strong>Age range:</strong> 8-14</p>
              <p><strong>Materials:</strong></p>
              <ul>
                <li>School glue (white or clear)</li>
                <li>Borax powder</li>
                <li>Water</li>
                <li>Food coloring (optional)</li>
                <li>Measuring cups</li>
                <li>Bowl for mixing</li>
                <li>Spoon</li>
              </ul>
              
              <BlogKeyPoint
                category="Science"
                point="Polymers are everywhere in our world - from DNA to plastic bottles. Slime making is a hands-on way to explore this important chemical structure."
              />
              
              <p><strong>Instructions:</strong></p>
              <ol>
                <li>In a bowl, mix 1/4 cup of school glue with 1/4 cup of water</li>
                <li>Add food coloring if desired and mix well</li>
                <li>In a separate cup, mix 1 teaspoon of borax powder with 1/2 cup of warm water until dissolved</li>
                <li>Slowly add the borax solution to the glue mixture while stirring</li>
                <li>Once it begins to form slime, knead with your hands until it reaches the desired consistency</li>
              </ol>
              <p><strong>The Science:</strong> This experiment demonstrates polymer chemistry. The glue contains polyvinyl acetate (a polymer) dissolved in water. When you add the borax solution, it creates cross-links between polymer chains, transforming the liquid glue into a semi-solid, stretchy material with non-Newtonian fluid properties.</p>
              <p><strong>Safety note:</strong> Borax should be handled by adults or under adult supervision. While safe for handling, it should not be ingested.</p>
              <p><strong>Extension:</strong> Experiment with different amounts of borax solution to create slime with different properties. Try adding glitter, small foam beads, or even thermochromic pigment (changes color with temperature).</p>

              <BlogSectionBreak category="Science" />

              <h2>Experiment 6: Crystal Garden</h2>
              <p><strong>Difficulty:</strong> Medium | <strong>Time:</strong> 3+ days | <strong>Age range:</strong> 8-14</p>
              
              <BlogIllustrationContainer 
                category="Science" 
                title="Crystal formation and growth"
                position="left"
              />
              
              <p><strong>Materials:</strong></p>
              <ul>
                <li>6 tablespoons table salt</li>
                <li>6 tablespoons laundry bluing (found in laundry aisle)</li>
                <li>6 tablespoons water</li>
                <li>1 tablespoon ammonia</li>
                <li>Food coloring (various colors)</li>
                <li>Porous materials (sponge pieces, charcoal, brick pieces, etc.)</li>
                <li>Shallow dish</li>
              </ul>
              <p><strong>Instructions:</strong></p>
              <ol>
                <li>Mix salt, bluing, water, and ammonia in a bowl</li>
                <li>Arrange porous materials in the shallow dish</li>
                <li>Pour the mixture over the materials</li>
                <li>Drop different food colors onto different areas</li>
                <li>Let sit undisturbed in a place where it won't be bumped</li>
                <li>Observe crystal growth over the next several days</li>
              </ol>
              <p><strong>The Science:</strong> This experiment demonstrates crystallization and capillary action. The salt solution moves up through the porous materials via capillary action. As water evaporates, salt crystals form and grow larger over time. The bluing provides metal particles that aid crystal formation.</p>
              <p><strong>Safety note:</strong> Ammonia has a strong smell and can irritate eyes and lungs, so work in a well-ventilated area and avoid breathing fumes directly.</p>
              <p><strong>Extension:</strong> Try different ratios of ingredients to see how that affects crystal growth. Document the crystal growth over time with photographs and measurements.</p>

              <h2>Experiment 7: Balloon-Powered Car</h2>
              <p><strong>Difficulty:</strong> Medium | <strong>Time:</strong> 30 minutes | <strong>Age range:</strong> 8-14</p>
              
              <BlogIllustrationContainer 
                category="Science" 
                title="Newton's laws in motion"
                position="right"
              />
              
              <p><strong>Materials:</strong></p>
              <ul>
                <li>Empty plastic bottle or cardboard box for the car body</li>
                <li>4 bottle caps or buttons for wheels</li>
                <li>2 straws or wooden skewers for axles</li>
                <li>Balloon</li>
                <li>Tape</li>
                <li>Scissors</li>
                <li>Optional: decorative materials</li>
              </ul>
              <p><strong>Instructions:</strong></p>
              <ol>
                <li>Cut a small hole in the bottle/box for the balloon nozzle</li>
                <li>Insert balloon through the hole with nozzle outside</li>
                <li>Secure with tape, ensuring an airtight seal</li>
                <li>Attach straws/skewers to the bottom as axles</li>
                <li>Secure wheels to the ends of the axles</li>
                <li>Inflate balloon through the nozzle</li>
                <li>Place on a smooth surface, release, and watch it go!</li>
              </ol>
              <p><strong>The Science:</strong> This demonstrates Newton's Third Law of Motion: for every action, there is an equal and opposite reaction. As air rushes out of the balloon in one direction, it propels the car in the opposite direction. It also illustrates concepts of force, motion, and air pressure.</p>
              <p><strong>Extension:</strong> Modify your design to make the car go faster or farther. Try different balloon sizes or add weight to see how it affects performance.</p>

              <BlogSectionBreak category="Science" />

              <h2>Experiment 8: Homemade Volcano</h2>
              <p><strong>Difficulty:</strong> Easy | <strong>Time:</strong> 20 minutes (plus model-making time) | <strong>Age range:</strong> 5-12</p>
              <p><strong>Materials:</strong></p>
              <ul>
                <li>Empty plastic bottle</li>
                <li>Baking dish or tray</li>
                <li>Clay, playdough, or paper-mâché for volcano shape</li>
                <li>Baking soda (2-3 tablespoons)</li>
                <li>Vinegar (1/2 cup)</li>
                <li>Dish soap (a few drops)</li>
                <li>Red and yellow food coloring</li>
              </ul>
              
              <BlogKeyPoint
                category="Science"
                point="Chemical reactions that produce gas can create dramatic visual effects, making abstract chemistry concepts concrete and exciting for young learners."
              />
              
              <p><strong>Instructions:</strong></p>
              <ol>
                <li>Place the bottle in the center of the baking dish</li>
                <li>Mold clay or paper-mâché around the bottle to form a volcano shape, leaving the bottle opening accessible</li>
                <li>Let dry if using paper-mâché</li>
                <li>Pour warm water into the bottle until about 1/3 full</li>
                <li>Add a few drops of dish soap and food coloring</li>
                <li>Add baking soda</li>
                <li>Quickly pour in vinegar and stand back to watch the eruption!</li>
              </ol>
              <p><strong>The Science:</strong> The vinegar (an acid) reacts with baking soda (a base) to form carbon dioxide gas, which creates bubbles and forces the mixture out of the bottle. The dish soap helps create bigger, longer-lasting bubbles. This demonstrates acid-base reactions and gas formation in chemical reactions.</p>
              <p><strong>Extension:</strong> Experiment with different amounts of each ingredient to create bigger eruptions. Try adding other ingredients like hydrogen peroxide or yeast for different effects.</p>

              <h2>Experiment 9: Oobleck (Non-Newtonian Fluid)</h2>
              <p><strong>Difficulty:</strong> Easy | <strong>Time:</strong> 10 minutes | <strong>Age range:</strong> 4-12</p>
              
              <BlogIllustrationContainer 
                category="Science" 
                title="Exploring unusual material properties"
                position="left"
              />
              
              <p><strong>Materials:</strong></p>
              <ul>
                <li>Cornstarch (2 cups)</li>
                <li>Water (1 cup)</li>
                <li>Large bowl</li>
                <li>Food coloring (optional)</li>
              </ul>
              <p><strong>Instructions:</strong></p>
              <ol>
                <li>Pour cornstarch into the bowl</li>
                <li>Gradually add water while mixing (add color if desired)</li>
                <li>Continue mixing until the mixture is both liquid-like and solid-like</li>
                <li>Experiment with touching it slowly vs. hitting it quickly</li>
              </ol>
              <p><strong>The Science:</strong> Oobleck is a non-Newtonian fluid, meaning it doesn't follow Newton's law of viscosity. It acts like a liquid when handled gently but behaves like a solid when force is applied. This demonstrates concepts of viscosity, states of matter, and how materials can have unusual properties.</p>
              <p><strong>Extension:</strong> Try running across a large batch in a kiddie pool (outside!). Experiment with other non-Newtonian fluids like ketchup or toothpaste to compare properties.</p>

              <h2>Experiment 10: Seed Germination Observation</h2>
              <p><strong>Difficulty:</strong> Easy | <strong>Time:</strong> 1-2 weeks | <strong>Age range:</strong> 5-12</p>
              <p><strong>Materials:</strong></p>
              <ul>
                <li>Clear jar or plastic cup</li>
                <li>Paper towels or cotton balls</li>
                <li>Bean seeds (lima beans work well)</li>
                <li>Water</li>
                <li>Notebook for observations</li>
              </ul>
              <p><strong>Instructions:</strong></p>
              <ol>
                <li>Line the inside of the jar with paper towels or cotton balls</li>
                <li>Place seeds between the paper/cotton and the jar wall so they're visible</li>
                <li>Add enough water to moisten the paper/cotton without flooding</li>
                <li>Place in a warm location with indirect light</li>
                <li>Observe daily, keeping the paper/cotton moist</li>
                <li>Record observations and measure growth</li>
              </ol>
              
              <BlogKeyPoint
                category="Science"
                point="Scientific observation over time helps children understand process and change - fundamental skills that apply across all scientific disciplines."
              />
              
              <p><strong>The Science:</strong> This experiment allows children to observe the process of germination—how a seed transforms into a plant. It demonstrates plant biology, growth, and the requirements for life (water, warmth, etc.).</p>
              <p><strong>Extension:</strong> Set up multiple jars with different variables: different types of seeds, different light conditions, different water amounts, or adding fertilizer to some. Compare results and discuss what variables affect plant growth.</p>

              <BlogSectionBreak category="Science" />

              <h2>Making the Most of Home Science Experiments</h2>
              <p>
                To maximize the educational value of these experiments, consider these approaches:
              </p>
              <ul>
                <li><strong>Ask questions</strong> before, during, and after the experiment to encourage critical thinking</li>
                <li><strong>Make predictions</strong> about what will happen and why</li>
                <li><strong>Document results</strong> through notes, drawings, or photographs</li>
                <li><strong>Discuss real-world applications</strong> of the scientific principles demonstrated</li>
                <li><strong>Extend learning</strong> by exploring related concepts or modifying experiments</li>
              </ul>
              <p>
                Remember that the process of scientific inquiry is more important than perfect results. Embrace unexpected outcomes as opportunities for deeper learning and further questions.
              </p>
              <p>
                With these simple experiments, you can transform your kitchen or living room into a laboratory of discovery. The skills and knowledge gained through hands-on experimentation will serve children well throughout their academic careers and beyond, fostering a lifelong love of science and learning.
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

export default ScienceExperimentsBlog; 