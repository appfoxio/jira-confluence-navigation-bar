package ut.co.uk.jackgraves;

import org.junit.Test;
import co.uk.jackgraves.api.NavBarComponent;
import co.uk.jackgraves.impl.NavBarComponentImpl;

import static org.junit.Assert.assertEquals;

public class MyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        NavBarComponent component = new NavBarComponentImpl(null);
        assertEquals("names do not match!", "myComponent",component.getName());
    }
}
