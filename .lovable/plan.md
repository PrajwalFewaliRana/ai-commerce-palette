# Customer navigation state

## Changes
- Treat every `/customer` page as customer mode even when login protection is disabled.
- Hide Sign in and Register on customer pages in both the desktop navigation and burger menu.
- Show customer links such as dashboard, orders, wishlist, notifications, and cart in that mode.
- Make the logo, burger-menu Home item, and customer breadcrumbs return to `/customer/dashboard` instead of the public landing page.
- Preserve the existing visual design and keep public-page navigation unchanged.

## Verification
- Check `/customer`, `/customer/dashboard`, and the mobile menu in the preview.
- Confirm the app still builds without errors.
