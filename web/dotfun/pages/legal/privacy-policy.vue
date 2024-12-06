<script lang="ts" setup>
import moment from "moment";

defineRouteRules({
  prerender: true,
});
</script>
<template>
  <main class="flex-1 flex flex-col overflow-y-scroll">
    <LayoutHeader class="sticky top-0" />
    <div class="flex-1 flex flex-col space-y-6 p-4">
      <div class="flex flex-col md:flex-row md:items-center">
        <h1 class="flex-1 text-2xl font-bold">Privacy Policy</h1>
        <p>
          Last updated
          {{ moment("2024-11-11T20:00:48.988Z").startOf("hour").fromNow() }}
        </p>
      </div>
      <div class="flex flex-col space-y-4">
        <div>
          <p>
            Protecting your privacy is really important to Saitama. We keep this
            in mind, we're providing this Privacy Policy to explain our
            practices regarding the collection, use, and disclosure of
            information that we receive through our Sevices.
          </p>
          <p>
            This Privacy Policies does not apply to any third-party websites,
            services, or applications, even if they are accessible through our
            services.
          </p>
        </div>
        <div class="flex flex-col space-y-2">
          <h1 class="text-xl font-medium">Revision to this Privacy Policy</h1>
          <div>
            Any information that is collected through our Services is covered by
            the Privacy Policy in effect at the time such information is
            collected. We may revise this Privacy Policy from time to time. If
            we make any material changes to this Privacy Policy, we'll notify
            you by email or through the Services, and we'll update the
            <pre class="inline">Last Updated Date</pre>
            above to indicate when those changes will become effective.
          </div>
        </div>
        <div class="flex flex-col space-y-4">
          <h1 class="text-xl font-medium">Collection and Use of Information</h1>
          <div class="flex flex-col space-y-4">
            <div class="flex flex-col space-y-2">
              <h1 class="text-lg font-medium">
                Information Collected or Received from You
              </h1>
              <p>
                Our primary goals in collecting information are to provide and
                improve our Services, to administer your use of the Services,
                and to enable you to enjoy and easily navigate our Services.
              </p>
            </div>
            <div class="flex flex-col space-y-2">
              <h1 class="text-lg font-medium">Account Information</h1>
              <p>
                If you create an Account, we'll collect certain information that
                can be used to identify you, such as your name and email address
                . If you use the Services through third party login credentials
                such as your Apple iCloud account, we'll collect a unique device
                identifier from your mobile device, so that we have a way of
                associating your content with you.
              </p>
            </div>
            <div class="flex flex-col space-y-2">
              <h1 class="text-lg font-medium">Information You Provide to Us</h1>
              <p>
                To make it easier for you to use the Services, we will give you
                the option of allowing Universe Exploration Company access to
                certain information on your mobile device, such as your camera
                roll, photo library, microphone, and sound files. We'll collect
                this information only for the purposes of providing the Services
                to you.
              </p>
            </div>
            <div class="flex flex-col space-y-2">
              <h1 class="text-lg font-medium">
                Information Collected Using Cookies and other Web Technologies
              </h1>
              <div>
                Like many online platform operators, we may use automated data
                collection tools such as Cookies to collect certain information
                about how our Services are used.
                <pre class="inline">Cookies</pre>
                are small text files that are placed on your device by a Web
                server when you access our Services. We may use both session
                Cookies and persistent Cookies to identify that you've logged in
                to the Services and to tell us how and when you interact with
                our Services. We may also use Cookies to monitor aggregate usage
                and web traffic routing on our Services and to customize and
                improve our Services. Unlike persistent Cookies, session Cookies
                are deleted when you log off from the Services and close your
                browser. Although most browsers automatically accept Cookies,
                you can change your browser options to stop automatically
                accepting Cookies or to prompt you before accepting Cookies. If
                you don't accept Cookies, you may not be able to access all
                portions or features of the Services. Some third-party service
                providers that we engage (including third-party advertisers) may
                also place their own Cookies on your device. This Privacy Policy
                covers only our use of Cookies and does not include use of
                Cookies by third parties. Information Related to Use of the
                Services Our servers automatically record certain information
                about how a person uses our Services (we refer to this
                information as
                <pre class="inline">Log Data</pre>
                ). Log Data may include information such as your internet
                protocol (IP) address, browser type, operating system, the web
                page that you were visiting before accessing our Services, the
                pages or features of our Services to which you browsed and the
                time spent on those pages or features, search terms, the links
                on our Services that you clicked on, and other data. We use Log
                Data to administer the Services and we analyze (and may engage
                third parties to analyze) Log Data to improve, customize, and
                enhance our Services by expanding their features and
                functionality and tailoring them to your needs and preferences.
                We may use your IP address to generate aggregate,
                non-identifying information about how our Services are used.
              </div>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <h1 class="text-xl font-medium">Questions?</h1>
            <p>
              Please contact us at
              <a
                class="underline underline-black"
                href="mailto:webmaster@saitama.fun"
                >webmaster@saitama.fun</a
              >
              if you have any questions about our Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
    <LayoutFooter />
  </main>
</template>
