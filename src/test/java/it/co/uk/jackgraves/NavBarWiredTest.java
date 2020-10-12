package it.co.uk.jackgraves;

import org.junit.Test;
import org.junit.runner.RunWith;
import com.atlassian.plugins.osgi.test.AtlassianPluginsTestRunner;
import co.uk.jackgraves.api.NavBarComponent;
import com.atlassian.sal.api.ApplicationProperties;

import static org.junit.Assert.assertEquals;

@RunWith(AtlassianPluginsTestRunner.class)
public class NavBarWiredTest
{
    private final ApplicationProperties applicationProperties;
    private final NavBarComponent navBarComponent;

    public NavBarWiredTest(ApplicationProperties applicationProperties, NavBarComponent navBarComponent)
    {
        this.applicationProperties = applicationProperties;
        this.navBarComponent = navBarComponent;
    }

    @Test
    public void testMyName()
    {
        assertEquals("names do not match!", "myComponent:" + applicationProperties.getDisplayName(), navBarComponent.getName());
    }
}
