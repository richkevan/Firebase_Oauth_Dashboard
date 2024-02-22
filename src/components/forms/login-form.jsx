import { navigate } from "astro/virtual-modules/transitions-router.js";
import app from "../../firebase/client";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";

const LoginForm = () => {
  let idToken;
  const firebaseAuth = getAuth(app);

  const signInUser = async (email, password) => {
    try {
      setPersistence(firebaseAuth, browserSessionPersistence);
      await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (user) => {
        // Signed in
        try {
          idToken = await user.user.getIdToken();
        } catch (error) {
          console.log(error);
        } finally {
          const headers = new Headers({"Authorization": `Bearer ${idToken}`});
          const response = await fetch("/api/auth/signin", {method: "GET", headers});
          console.log(response);
          if (response.ok) {
            navigate(response.url);
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    signInUser(data.email, data.password);
  };

  

  return (
      <form class="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
          </div>

          <div class="text-sm leading-6">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>  
  )
};

export default LoginForm;