import React from 'react';
import {motion} from 'framer-motion';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useToast} from '@/hooks/use-toast';
import {apiRequest} from '@/lib/queryClient';
import {FaCodepen, FaEnvelope, FaGithub, FaGlobe, FaLinkedin, FaMapMarkerAlt, FaTwitter} from 'react-icons/fa';

const contactFormSchema = z.object({
    name: z.string().min(2, {message: 'Name must be at least 2 characters long'}),
    email: z.string().email({message: 'Please enter a valid email address'}),
    subject: z.string().min(3, {message: 'Subject must be at least 3 characters long'}),
    message: z.string().min(10, {message: 'Message must be at least 10 characters long'}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
    const {toast} = useToast();

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            await apiRequest('POST', '/api/contact', data);

            toast({
                title: 'Message sent successfully!',
                description: "Thanks for reaching out. I'll get back to you soon.",
                variant: 'default',
            });

            form.reset();
        } catch (error) {
            toast({
                title: 'Failed to send message',
                description: error instanceof Error ? error.message : 'An unknown error occurred',
                variant: 'destructive',
            });
        }
    };

    return (
        <section id="contact" className="py-20">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="section-title">Get In Touch</h2>
                    <div className="section-divider"></div>
                    <p className="section-description">
                        Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    <motion.div
                        className="md:w-1/2"
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5}}
                    >
                        <Card>
                            <CardContent className="p-8">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your name" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your email address" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Subject</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Subject of your message" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Message</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Your message"
                                                            rows={5}
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-blue-600"
                                            disabled={form.formState.isSubmitting}
                                        >
                                            {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div className="md:w-1/2">
                        <motion.div
                            initial={{opacity: 0, x: 30}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5}}
                            className="space-y-8"
                        >
                            {/* Contact Info */}
                            <Card className="mb-8">
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                                    <div className="space-y-6">
                                        <div className="flex items-start">
                                            <div
                                                className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                                                <FaEnvelope className="text-primary text-xl"/>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-medium mb-1">Email</h4>
                                                <a href="mailto:sahilthegeek999@gmail.com"
                                                   className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                                                    sahilthegeek999@gmail.com
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div
                                                className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                                                <FaMapMarkerAlt className="text-secondary text-xl"/>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-medium mb-1">Location</h4>
                                                <p className="text-gray-700 dark:text-gray-300">Agartala,
                                                    Tripura</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div
                                                className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                                                <FaGlobe className="text-accent text-xl"/>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-medium mb-1">Availability</h4>
                                                <p className="text-gray-700 dark:text-gray-300">Open to freelance
                                                    opportunities and full-time positions</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Social Links */}
                            <Card>
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <a
                                            href="https://github.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <FaGithub className="text-2xl mr-3"/>
                                            <span>GitHub</span>
                                        </a>

                                        <a
                                            href="https://linkedin.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <FaLinkedin className="text-2xl text-blue-600 mr-3"/>
                                            <span>LinkedIn</span>
                                        </a>

                                        <a
                                            href="https://twitter.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <FaTwitter className="text-2xl text-blue-400 mr-3"/>
                                            <span>Twitter</span>
                                        </a>

                                        <a
                                            href="https://codepen.io"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <FaCodepen className="text-2xl mr-3"/>
                                            <span>CodePen</span>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
